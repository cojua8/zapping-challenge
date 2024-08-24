const express = require("express");

const usersRouter = express.Router();
module.exports = usersRouter;

usersRouter.use(express.json());

usersRouter.post("/login", (req, res) => {
  console.log("Logging in user", JSON.stringify(req.body));
  res.send({});
});

usersRouter.post("/register", (req, res) => {
  console.log("Registering user", JSON.stringify(req.body));
  res.send({});
});
