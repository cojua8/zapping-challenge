const express = require("express");
const path = require("path");
const { createPlaylistFile, moveToFinalSegments } = require("./playlist");

const videoRouter = express.Router();
module.exports = videoRouter;

videoRouter.get("/video.m3u8", (req, res) => {
  console.log("Serving playlist file");
  let file = createPlaylistFile();
  console.log(file.toString());

  res.header("Content-Type", "application/vnd.apple.mpegurl");
  res.send(file);
});

videoRouter.get("/:resource", (req, res) => {
  console.log("Serving file", req.params.resource);
  res.sendFile(path.join(__dirname, "videos", req.params.resource));
});

videoRouter.post("/end", (req, res) => {
  console.log("Moving to end of video");
  moveToFinalSegments();
  res.sendStatus(200);
});
