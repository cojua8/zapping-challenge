const express = require("express");
const path = require("path");
const videoRouter = require("./video/video");
const usersRouter = require("./users");

const app = express();

app.use("/", express.static(path.join(__dirname, "../frontend")));
app.use("/video", videoRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Zapping HLS app listening on port ${PORT}`);
});
