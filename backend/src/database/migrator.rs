use sea_orm::DatabaseConnection;
pub use sea_orm_migration::prelude::*;

mod m20240901_000835_create_users_table;

struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![Box::new(m20240901_000835_create_users_table::Migration)]
    }
}

pub async fn refresh_migrations(database_connection: &DatabaseConnection) {
    print!("Refreshing migrations...");
    Migrator::refresh(database_connection).await.unwrap();
    println!("Done!");
}
