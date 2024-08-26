import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, name TEXT, password TEXT)"
    );
});

/**
 * Gets a user by the provided email, and execute callback
 */
export function getUser(email, callback) {
    db.get(
        "SELECT name, email, password FROM users WHERE email = ?",
        [email],
        callback
    );
}

/** Creates a new user */
export function createUser(email, name, password) {
    db.run(
        "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
        [email, name, password],
        (err) => {
            if (err) {
                console.error(err);
            }
        }
    );
}
