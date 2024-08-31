mod users;
mod video;
use std::{
    sync::{Arc, Mutex},
    time::{self, SystemTime},
};

use axum::{routing::get, Router};

pub async fn create_app() {
    let started_time = time::SystemTime::now();
    let config = Config::build(started_time).unwrap();
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .nest("/video", video::router::create_router())
        .nest("/users", users::create_router())
        .with_state(config);

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[derive(Clone)]
struct Config {
    pub videos_path: String,
    pub total_segments: usize,
    pub playlist_size: usize,
    pub started_time: Arc<Mutex<SystemTime>>,
}

impl Config {
    fn build(started_time: SystemTime) -> Result<Self, &'static str> {
        let videos_path = std::env::var("VIDEOS_PATH").expect("VIDEOS_PATH must be set");
        let total_segments = std::env::var("TOTAL_SEGMENTS")
            .expect("TOTAL_SEGMENTS must be set")
            .parse()
            .unwrap();
        let playlist_size = std::env::var("PLAYLIST_SIZE")
            .expect("PLAYLIST_SIZE must be set")
            .parse()
            .unwrap();

        Ok(Self {
            videos_path,
            total_segments,
            playlist_size,
            started_time: Arc::new(Mutex::new(started_time)),
        })
    }

    pub fn set_started_time(&self, new_started_time: SystemTime) {
        let mut current_started_time = self.started_time.lock().expect("poisoned mutex");
        *current_started_time = new_started_time;
    }
}
