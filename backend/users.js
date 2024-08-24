const express = require("express");
const { getUser, createUser } = require("./database");
const usersRouter = express.Router();
module.exports = usersRouter;

usersRouter.use(express.json());

usersRouter.post("/login", (req, res) => {
  let { email, password } = req.body;
  let user = getUser(email, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row) {
      if (row.password === password) {
        console.log("Logging in user", req.body);
        res.send({ name: row.name, email: row.email });
      }
    } else {
      res.status(400).json({ error: "Bad email or password" });
    }
  });
});

usersRouter.post("/register", async (req, res) => {
  let { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match" });
    return;
  }

  getUser(email, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row) {
      console.log("User already exists", row);
      res.status(400).json({ error: "User already exists" });
    } else {
      console.log("Registering user", JSON.stringify(req.body));
      createUser(email, name, password);
      res.send({ name, email });
    }
  });
});
