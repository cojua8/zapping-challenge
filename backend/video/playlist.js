const constants = require("../constants");

module.exports = createPlaylistFile;

let startedTimestamp = Date.now();

function createPlaylistFile() {
  let segmentsCount = elapsedSegments();

  let playlistFile = createPlaylistHeaders(segmentsCount);
  for (let counter = 0; counter < constants.PLAYLIST_SIZE; counter++) {
    playlistFile += createSegment(segmentsCount + counter);
  }

  if (
    segmentsCount ===
    constants.TOTAL_SEGMENTS - constants.PLAYLIST_SIZE + 1
  ) {
    playlistFile = playlistFile + "#EXT-X-ENDLIST";
  }

  return Buffer.from(playlistFile);
}

function createSegment(segmentCounter) {
  let segmentFile = `segment${segmentCounter}.ts\n`;

  if (segmentCounter < constants.TOTAL_SEGMENTS) {
    return "#EXTINF:10.000000,\n" + segmentFile;
  } else if (segmentCounter === constants.TOTAL_SEGMENTS) {
    return "#EXTINF:4.566667,\n" + segmentFile;
  } else {
    return "";
  }
}

function createPlaylistHeaders(sequenceCounter) {
  return (
    "#EXTM3U\n" +
    "#EXT-X-VERSION:3\n" +
    "#EXT-X-TARGETDURATION:10\n" +
    `#EXT-X-MEDIA-SEQUENCE:${sequenceCounter}\n`
  );
}

function elapsedSegments() {
  return Math.min(
    Math.trunc((Date.now() - startedTimestamp) / 10000),
    constants.TOTAL_SEGMENTS
  );
}
