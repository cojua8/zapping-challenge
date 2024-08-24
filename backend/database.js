const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, name TEXT, password TEXT)"
  );
});

async function getUser(email, callback) {
  db.get(
    "SELECT name, email, password FROM users WHERE email = ?",
    [email],
    callback
  );
}

function createUser(email, name, password) {
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

module.exports = { getUser, createUser };
