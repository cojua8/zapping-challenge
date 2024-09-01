use crate::database::{create_user::create_user, get_user::get_user_by_email};

use crate::Config;
use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::post,
    Json, Router,
};
use sea_orm::DbErr;

use super::models::{Error, LoginBody, RegisterBody};

pub fn create_router() -> Router<Config> {
    Router::new()
        .route("/register/", post(register_user_handler))
        .route("/login/", post(login_user_handler))
}

async fn register_user_handler(
    State(config): State<Config>,
    register_body: Json<RegisterBody>,
) -> Response {
    if register_body.password != register_body.confirm_password {
        return (
            StatusCode::BAD_REQUEST,
            Json(Error::new("PASSWORDS_DO_NOT_MATCH")),
        )
            .into_response();
    }

    let result = create_user(register_body.0.into(), &config.database_connection).await;

    match result {
        Ok(user) => (StatusCode::CREATED, Json(user)).into_response(),
        Err(err) => match err {
            DbErr::Query(_) => (
                StatusCode::BAD_REQUEST,
                Json(Error::new("USER_ALREADY_EXISTS")),
            )
                .into_response(),
            _ => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        },
    }
}

async fn login_user_handler(State(config): State<Config>, login_body: Json<LoginBody>) -> Response {
    let user = get_user_by_email(&login_body.email, &config.database_connection).await;

    match user {
        Ok(maybe_user) => match maybe_user {
            Some(user) => {
                if user.password == login_body.password {
                    (StatusCode::OK, Json(user)).into_response()
                } else {
                    (StatusCode::NOT_FOUND, Json(Error::new("BAD_CREDENTIALS"))).into_response()
                }
            }
            None => (StatusCode::NOT_FOUND, Json(Error::new("BAD_CREDENTIALS"))).into_response(),
        },
        Err(err) => match err {
            DbErr::Query(_) => {
                (StatusCode::NOT_FOUND, Json(Error::new("BAD_CREDENTIALS"))).into_response()
            }
            _ => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        },
    }
}
