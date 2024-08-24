const express = require("express");

const usersRouter = express.Router();
module.exports = usersRouter;

usersRouter.use(express.json());

users = {};

usersRouter.post("/login", (req, res) => {
  console.log("Logging in user", req.body);
  let { email, password } = req.body;

  if (!users[email]) {
    res.sendStatus(400);
    return;
  } else if (users[email].password !== password) {
    res.sendStatus(400);
    return;
  } else {
    let name = users[email].name;
    res.send({ name, email });
  }
});

usersRouter.post("/register", (req, res) => {
  console.log("Registering user", JSON.stringify(req.body));
  let { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.sendStatus(400);
    return;
  } else if (users[email]) {
    res.sendStatus(400);
    return;
  } else {
    users[email] = { password, name };
    res.send({ name, email });
  }
});
