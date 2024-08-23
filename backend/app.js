const TOTAL_SEGMENTS = 63;
const PLAYLIST_SIZE = 3;
const MAX_SEQUENCE_COUNTER = TOTAL_SEGMENTS - PLAYLIST_SIZE + 1;

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send({ result: "Hello World!" });
});
let seq = 0;
app.get("/video/video.m3u8", (req, res) => {
  console.log("requesting playlist file");
  let file = createPlaylistFile(seq);
  res.header("Content-Type", "application/vnd.apple.mpegurl");
  res.send(file);

  seq = ++seq % (MAX_SEQUENCE_COUNTER + 1);
});

app.get("/video/:resource", (req, res) => {
  console.log("requesting file", req.params.resource);
  res.sendFile(path.join(__dirname, "videos", req.params.resource));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Zapping HLS app listening on port ${port}`);
});

function createPlaylistFile(sequenceCounter) {
  let playlistFile = createPlaylistHeaders(sequenceCounter);
  for (let counter = 0; counter < PLAYLIST_SIZE; counter++) {
    playlistFile += createSegment(sequenceCounter + counter);
  }

  if (sequenceCounter === MAX_SEQUENCE_COUNTER) {
    playlistFile = playlistFile + "#EXT-X-ENDLIST";
  }

  return Buffer.from(playlistFile);
}

function createSegment(segmentCounter) {
  let extinf =
    segmentCounter === TOTAL_SEGMENTS
      ? "#EXTINF:4.566667,\n"
      : "#EXTINF:10.000000,\n";

  let segmentFile = `segment${segmentCounter}.ts\n`;

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
