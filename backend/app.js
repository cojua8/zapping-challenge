const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({ origin: "http://localhost:5500" }));

app.get("/", (req, res) => {
  res.send({ result: "Hello World!" });
});

app.get("/video.m3u8", (req, res) => {
  let file = createPlaylistFile();
  res.header("Content-Type", "application/vnd.apple.mpegurl");
  res.send(file);
});

app.get("/resources/:resource", (req, res) => {
  console.log("requesting file", req.params.resource);
  res.sendFile(path.join(__dirname, "videos", req.params.resource));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Zapping HLS app listening on port ${port}`);
});

function createPlaylistFile() {
  let sequenceCounter = 0;
  let playlistFile =
    createPlaylistHeaders(sequenceCounter) +
    createSegment(sequenceCounter) +
    createSegment(sequenceCounter + 1) +
    createSegment(sequenceCounter + 2);

  if (sequenceCounter + 2 === 63) {
    playlistFile = playlistFile + "#EXT-X-ENDLIST";
  }

  return Buffer.from(playlistFile);
}

function createSegment(segmentCounter) {
  let extinf =
    segmentCounter === 63 ? "#EXTINF:4.566667,\n" : "#EXTINF:10.000000,\n";
  let segmentFile = `http://localhost:3000/resources/segment${segmentCounter}.ts\n`;

  return extinf + segmentFile;
}

function createPlaylistHeaders(sequenceCounter) {
  return (
    "#EXTM3U\n" +
    "#EXT-X-VERSION:3\n" +
    "#EXT-X-TARGETDURATION:10\n" +
    `#EXT-X-MEDIA-SEQUENCE:${sequenceCounter}\n`
  );
}
