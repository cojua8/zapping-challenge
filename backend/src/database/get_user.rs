use super::users::Entity as DbUser;
use crate::users::models::User;
use sea_orm::{DatabaseConnection, DbErr, EntityTrait};

pub async fn get_user_by_email(
    email: &str,
    connection: &DatabaseConnection,
) -> Result<Option<User>, DbErr> {
    let result = DbUser::find_by_id(email).one(connection).await;

    result.map(|option| option.map(|user| user.into()))
}
