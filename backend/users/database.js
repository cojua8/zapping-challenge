import pg from "pg";

const client = new pg.Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});

await client.connect();
// Create the users table if it doesn't exist
client.query(
    "CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, name TEXT, password TEXT)"
);

/**
 * Gets a user by the provided email. Returns null if the user does not exist
 */
export async function getUser(email) {
    const result = await client.query({
        text: "SELECT name, email, password FROM users WHERE email = $1",
        values: [email],
    });

    if (result.rowCount === 0) {
        return null;
    } else if (result.rowCount > 1) {
        throw new Error("Multiple users with the same email");
    }

    return result.rows[0];
}

/** Creates a new user */
export async function createUser(email, name, password) {
    try {
        const result = await client.query({
            text: "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING email, name, password",
            values: [email, name, password],
        });
        return result.rows[0];
    } catch (e) {
        console.error("Error creating user", e.detail);
        return undefined;
    }
}
