use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    extract::State,
    response::IntoResponse,
};
use futures_util::{SinkExt, StreamExt};
use redis::AsyncCommands;
use jsonwebtoken::{decode, DecodingKey, Validation};
use std::sync::Arc;
use tokio::sync::mpsc;
use uuid::Uuid;

use crate::api::v1::models::{ChatMessage, Claims};
use crate::{AppState, Tx};

// ws_handler — WebSocket কানেকশন ইনিশিয়েট করে এবং টোকেন ভেরিফাই করে
pub async fn ws_handler(
    ws: WebSocketUpgrade,
    State(state): State<Arc<AppState>>,
    headers: axum::http::HeaderMap,
) -> impl IntoResponse {
    let token = headers
        .get("Authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));

    if let Some(token) = token {
        let secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "your_super_secret_key_for_nagoman".to_string());
        let validation = Validation::default();
        
        match decode::<Claims>(
            token,
            &DecodingKey::from_secret(secret.as_ref()),
            &validation,
        ) {
            Ok(token_data) => {
                let user_id = Uuid::parse_str(&token_data.claims.sub).unwrap_or_default();
                ws.on_upgrade(move |socket| handle_socket(socket, state, user_id))
            }
            Err(_) => {
                (axum::http::StatusCode::UNAUTHORIZED, "Invalid token").into_response()
            }
        }
    } else {
        (axum::http::StatusCode::UNAUTHORIZED, "Missing token").into_response()
    }
}

// handle_socket — কানেকশন একসেপ্ট হওয়ার পর রিয়েল-টাইম মেসেজিং লজিক
async fn handle_socket(socket: WebSocket, state: Arc<AppState>, user_id: Uuid) {
    let (mut sender, mut receiver) = socket.split();
    let (tx, mut rx) = mpsc::unbounded_channel();
    
    state.user_connections.insert(user_id, tx);
    println!("ইউজার অনলাইন: {}", user_id);

    // টাস্ক ১: সকেটে মেসেজ পুশ করা
    let mut send_task = tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            if sender.send(msg).await.is_err() { break; }
        }
    });

    // টাস্ক ২: সকেট থেকে মেসেজ রিসিভ করা এবং রেডিসে পাবলিশ করা
    let state_clone = state.clone();
    let mut recv_task = tokio::spawn(async move {
        let mut redis_conn = state_clone.redis_client.get_async_connection().await.unwrap();
        
        while let Some(Ok(msg)) = receiver.next().await {
            if let Message::Text(text) = msg {
                let _: () = redis_conn.publish("nagoman_messages", &text).await.unwrap();
                println!("মেসেজ রেডিসে পাবলিশ করা হয়েছে");
            }
        }
    });

    tokio::select! {
        _ = (&mut send_task) => recv_task.abort(),
        _ = (&mut recv_task) => send_task.abort(),
    };

    state.user_connections.remove(&user_id);
    println!("ইউজার অফলাইন: {}", user_id);
}
