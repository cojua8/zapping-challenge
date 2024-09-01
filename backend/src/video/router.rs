use std::path;

use axum::{
    extract::{Path, Query, State},
    http::{header, StatusCode},
    response::IntoResponse,
    routing::{get, post},
    Router,
};
use serde::Deserialize;

use crate::{
    video::playlist::{move_to_final_segment, move_to_initial_segment},
    Config,
};

use super::playlist::create_playlist;

pub fn create_router() -> Router<Config> {
    Router::new()
        .route("/video.m3u8", get(get_playlist_handler))
        .route("/:resource", get(get_resource_handler))
        .route("/move", post(move_time_handler))
}

async fn get_resource_handler(
    Path(resource): Path<String>,
    State(config): State<Config>,
) -> impl IntoResponse {
    println!("Serving file {}", resource);

    let segment_path = path::Path::new(&config.videos_path).join(resource);

    // read file and send as response
    let file = tokio::fs::File::open(&segment_path).await.unwrap();
    let mut reader = tokio::io::BufReader::new(file);
    let mut body = Vec::new();
    tokio::io::copy(&mut reader, &mut body).await.unwrap();

    (StatusCode::OK, body)
}

async fn get_playlist_handler(State(config): State<Config>) -> impl IntoResponse {
    let playlist = create_playlist(&config);

    println!("Serving playlist\n{playlist}");
    (
        [(header::CONTENT_TYPE, "application/vnd.apple.mpegurl")],
        playlist,
    )
}

async fn move_time_handler(
    query: Query<MoveQuery>,
    State(config): State<Config>,
) -> impl IntoResponse {
    match query.to {
        MoveTo::Start => {
            println!("Moving to start of video");
            move_to_initial_segment(&config);
        }
        MoveTo::End => {
            println!("Moving to end of video");
            move_to_final_segment(&config);
        }
    }

    StatusCode::OK
}

#[derive(Deserialize)]
enum MoveTo {
    #[serde(rename = "start")]
    Start,
    #[serde(rename = "end")]
    End,
}

#[derive(Deserialize)]
struct MoveQuery {
    to: MoveTo,
}
