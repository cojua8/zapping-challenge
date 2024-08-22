const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({ origin: "http://localhost:5500" }));

app.get("/", (req, res) => {
  res.send({ result: "Hello World!" });
});

app.get("/video.m3u8", (req, res) => {
  res.sendFile(path.join(__dirname, "videos", "segment.m3u8"));
});

app.get("/resources/:resource", (req, res) => {
  console.log("requesting file", req.params.resource);
  res.sendFile(path.join(__dirname, "videos", req.params.resource));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Zapping HLS app listening on port ${port}`);
});
