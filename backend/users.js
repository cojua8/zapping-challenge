const express = require("express");
const { getUser, createUser } = require("./database");
const usersRouter = express.Router();
module.exports = usersRouter;

usersRouter.use(express.json());

/*
 * POST /login
 * Fails if the user does not exist or the password is incorrect
 * Request body: { email: string, password: string }
 * Response:
 *  - Success: { name: string, email: string }
 *  - Failure: { error: string }
 */
usersRouter.post("/login", (req, res) => {
  let { email, password } = req.body;
  getUser(email, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row && row.password === password) {
      console.log("Logging in user", req.body);
      res.send({ name: row.name, email: row.email });
    } else {
      res.status(400).json({ error: "BAD_CREDENTIALS" });
    }
  });
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
  let { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ error: "PASSWORDS_DO_NOT_MATCH" });
    return;
  }

  getUser(email, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row) {
      console.log("User already exists", row);
      res.status(400).json({ error: "USER_ALREADY_EXISTS" });
    } else {
      console.log("Registering user", JSON.stringify(req.body));
      createUser(email, name, password);
      res.send({ name, email });
    }
  });
});
