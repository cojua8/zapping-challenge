if (Hls.isSupported()) {
  var video = document.getElementById("video");
  var hls = new Hls();
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    console.log("video and hls.js are now bound together !");
  });
  hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
    console.log(
      "manifest loaded, found " + data.levels.length + " quality level"
    );
  });
  hls.loadSource("http://localhost:3000/video.m3u8");
  // bind them together
  hls.attachMedia(video);
}
