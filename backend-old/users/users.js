import express from "express";
import { createUser, getUser } from "./database.js";

const usersRouter = express.Router();
export default usersRouter;

usersRouter.use(express.json());

/*
 * POST /login
 * Fails if the user does not exist or the password is incorrect
 * Request body: { email: string, password: string }
 * Response:
 *  - Success: { name: string, email: string }
 *  - Failure: { error: string }
 */
usersRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser(email);

    if (user && user.password === password) {
        console.log("Logging in user", req.body);
        res.send({ name: user.name, email: user.email });
    } else {
        res.status(400).json({ error: "BAD_CREDENTIALS" });
    }
});

/*
 * POST /register
 * Fails if the user email already exists or the passwords do not match
 * Request body: { name: string, email: string, password: string, confirmPassord: string }
 * Response:
 *  - Success: { name: string, email: string }
 *  - Failure: { error: string }
 */
usersRouter.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({ error: "PASSWORDS_DO_NOT_MATCH" });
        return;
    }

    const user = await createUser(email, name, password);
    if (user) {
        console.log("Registering user", JSON.stringify(req.body));
        res.send({ name: user.name, email: user.email });
    } else {
        console.log("User already exists");
        res.status(400).json({ error: "USER_ALREADY_EXISTS" });
    }
});
