use zapping_hls_backend::create_app;

#[tokio::main]
async fn main() {
    create_app().await;
}
