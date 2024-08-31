use axum::{routing::get, Router};

use crate::Config;

pub fn create_router() -> Router<Config> {
    Router::new().route("/", get(|| async { "Hello from users!" }))
}
