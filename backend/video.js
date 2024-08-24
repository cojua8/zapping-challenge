const express = require("express");
const path = require("path");
const constants = require("./constants");

const videoRouter = express.Router();
module.exports = videoRouter;

let seq = 0;
videoRouter.get("/video.m3u8", (req, res) => {
  console.log("requesting playlist file");
  let file = createPlaylistFile(seq);
  res.header("Content-Type", "application/vnd.apple.mpegurl");
  res.send(file);

  seq = ++seq % (constants.MAX_SEQUENCE_COUNTER + 1);
});

videoRouter.get("/:resource", (req, res) => {
  console.log("requesting file", req.params.resource);
  res.sendFile(path.join(__dirname, "videos", req.params.resource));
});

function createPlaylistFile(sequenceCounter) {
  let playlistFile = createPlaylistHeaders(sequenceCounter);
  for (let counter = 0; counter < constants.PLAYLIST_SIZE; counter++) {
    playlistFile += createSegment(sequenceCounter + counter);
  }

  if (sequenceCounter === constants.MAX_SEQUENCE_COUNTER) {
    playlistFile = playlistFile + "#EXT-X-ENDLIST";
  }

  return Buffer.from(playlistFile);
}

function createSegment(segmentCounter) {
  let extinf =
    segmentCounter === constants.TOTAL_SEGMENTS
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
