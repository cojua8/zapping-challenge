use super::users::Entity as DbUser;
use crate::users::models::User;
use sea_orm::{DatabaseConnection, EntityTrait};

pub async fn get_user_by_email(email: &str, connection: &DatabaseConnection) -> Option<User> {
    let user = DbUser::find_by_id(email).one(connection).await.unwrap();

    user.map(|user| user.into())
}
