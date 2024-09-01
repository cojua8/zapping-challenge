use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct User {
    pub email: String,
    pub name: String,
    #[serde(skip_serializing)]
    pub password: String,
}

#[derive(Deserialize)]
pub struct RegisterBody {
    pub name: String,
    pub email: String,
    pub password: String,
    #[serde(rename = "confirmPassword")]
    pub confirm_password: String,
}

impl From<RegisterBody> for User {
    fn from(val: RegisterBody) -> Self {
        User {
            email: val.email,
            name: val.name,
            password: val.password,
        }
    }
}

#[derive(Deserialize)]
pub struct LoginBody {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct Error {
    error: String,
}

impl Error {
    pub fn new(error: &str) -> Self {
        Self {
            error: error.to_string(),
        }
    }
}
