use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ChatMessage {
    pub sender_id: Uuid,
    pub receiver_id: Uuid,
    pub content: String,
    pub msg_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,  // User ID
    #[serde(rename = "type")]
    pub user_type: String, // citizen | member | representative
    pub exp: usize,
}
