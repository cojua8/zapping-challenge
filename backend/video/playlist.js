const constants = require("../constants");

module.exports = { createPlaylistFile, moveToFinalSegments };

/**
 * Creates an in-memory playlist file for the video stream
 */
function createPlaylistFile() {
  let segmentsCount = elapsedSegments();

  let headers = createPlaylistHeaders(segmentsCount);
  let segments = createPlaylistSegments(segmentsCount);
  let footer = createPlaylistFooter(segmentsCount);

  return Buffer.from(headers + segments + footer);
}

/**
 * Creates the headers for the playlist
 */
function createPlaylistHeaders(sequenceCounter) {
  return (
    "#EXTM3U\n" +
    "#EXT-X-VERSION:3\n" +
    "#EXT-X-TARGETDURATION:10\n" +
    `#EXT-X-MEDIA-SEQUENCE:${sequenceCounter}\n`
  );
}

/**
 * Create the segments of the playlist
 */
function createPlaylistSegments(segmentsCount) {
  let segments = "";
  for (let counter = 0; counter < constants.PLAYLIST_SIZE; counter++) {
    segments += createSegment(segmentsCount + counter);
  }
  return segments;
}

/**
 * Creates the footer for the playlist
 * The footer is only present when the last segment is reached
 */
function createPlaylistFooter(segmentsCount) {
  let footer = "";
  if (segmentsCount >= constants.TOTAL_SEGMENTS - constants.PLAYLIST_SIZE + 1) {
    footer = "#EXT-X-ENDLIST";
  }
  return footer;
}

/**
 * Creates a segment for the playlist file
 */
function createSegment(segmentCounter) {
  let segmentFile = `segment${segmentCounter}.ts`;

  if (segmentCounter < constants.TOTAL_SEGMENTS) {
    return `#EXTINF:10.000000,\n${segmentFile}\n`;
  } else if (segmentCounter === constants.TOTAL_SEGMENTS) {
    return `#EXTINF:4.566667,\n${segmentFile}\n`;
  } else {
    return "";
  }
}

// The timestamp when server started. Helps simulating live streaming
let startedTimestamp = Date.now();
/**
 * Returns the number of segments (of ten seconds) that have elapsed since
 * the server started, capped at the maximum number of segments plus one
 */
function elapsedSegments() {
  return Math.min(
    Math.trunc((Date.now() - startedTimestamp) / 10000),
    constants.TOTAL_SEGMENTS + 1
  );
}

function moveToFinalSegments() {
  startedTimestamp =
    Date.now() -
    (constants.TOTAL_SEGMENTS - constants.PLAYLIST_SIZE - 1) * 10000;
}
