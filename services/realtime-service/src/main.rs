mod api;

use axum::{
    extract::ws::Message,
    routing::get,
    Router,
};
use dashmap::DashMap;
use futures_util::StreamExt;
use redis::AsyncCommands;
use std::sync::Arc;
use tokio::sync::mpsc;
use uuid::Uuid;

use crate::api::v1::handlers::ws_handler;
use crate::api::v1::models::ChatMessage;

// --- টাইপ এবং স্টেট ---
pub type Tx = mpsc::UnboundedSender<Message>;

pub struct AppState {
    pub user_connections: DashMap<Uuid, Tx>,
    pub redis_client: redis::Client,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    // ১. রেডিস কানেকশন সেটআপ
    let redis_url = std::env::var("REDIS_URL").unwrap_or_else(|_| "redis://127.0.0.1/".to_string());
    let redis_client = redis::Client::open(redis_url).expect("রেডিস কানেক্ট করা সম্ভব হয়নি");

    let app_state = Arc::new(AppState {
        user_connections: DashMap::new(),
        redis_client: redis_client.clone(),
    });

    // ২. রেডিস সাবস্ক্রাইবার টাস্ক (Scalability এর জন্য)
    let state_for_redis = app_state.clone();
    let redis_subscriber = redis_client.clone();
    tokio::spawn(async move {
        let mut conn = redis_subscriber.get_async_pubsub().await.unwrap();
        conn.subscribe("nagoman_messages").await.unwrap();
        let mut stream = conn.on_message();

        while let Some(msg) = stream.next().await {
            let payload: String = msg.get_payload().unwrap();
            if let Ok(chat_msg) = serde_json::from_str::<ChatMessage>(&payload) {
                if let Some(target_tx) = state_for_redis.user_connections.get(&chat_msg.receiver_id) {
                    let _ = target_tx.send(Message::Text(payload));
                }
            }
        }
    });

    // ৩. রাউটিং এবং সার্ভার স্টার্ট
    let app = Router::new()
        .route("/api/v1/ws", get(ws_handler)) // ভার্সনড রাউট
        .with_state(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081").await.unwrap();
    println!("NagoMan Scalable Realtime Service (Rust + Redis) running on :8081");
    println!("WebSocket Endpoint: /api/v1/ws");
    
    axum::serve(listener, app).await.unwrap();
}
