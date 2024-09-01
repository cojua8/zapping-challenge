use crate::database::users;
use crate::users::models::User;
use sea_orm::{ActiveModelTrait, DatabaseConnection};

pub async fn create_user(
    new_user: User,
    connection: &DatabaseConnection,
) -> Result<User, sea_orm::DbErr> {
    let user = users::ActiveModel {
        email: sea_orm::ActiveValue::Set(new_user.email),
        name: sea_orm::ActiveValue::Set(new_user.name),
        password: sea_orm::ActiveValue::Set(new_user.password),
    };

    let result = user.insert(connection).await;

    result.map(|model| model.into())
}
