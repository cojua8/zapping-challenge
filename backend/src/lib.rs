mod users;
mod video;
use axum::{routing::get, Router};

pub async fn create_app() {
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .nest("/video", video::create_router())
        .nest("/users", users::create_router());

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
