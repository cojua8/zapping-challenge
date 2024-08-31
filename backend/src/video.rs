use std::{env, path};

use axum::{extract::Path, http::StatusCode, response::IntoResponse, routing::get, Router};

pub fn create_router() -> Router {
    Router::new()
        .route("/", get(|| async { "Hello from video!" }))
        .route("/video.m3u8", get(|| async { "Serving playlist!" }))
        .route("/:resource", get(get_resource_handler))
}

async fn get_resource_handler(Path(resource): Path<String>) -> impl IntoResponse {
    println!("Serving file {}", resource);

    let videos_path = env::var("VIDEOS_PATH").unwrap();
    let segment_path = path::Path::new(&videos_path).join(resource);

    // read file and send as response
    let file = tokio::fs::File::open(&segment_path).await.unwrap();
    let mut reader = tokio::io::BufReader::new(file);
    let mut body = Vec::new();
    tokio::io::copy(&mut reader, &mut body).await.unwrap();

    (StatusCode::OK, body)
}
