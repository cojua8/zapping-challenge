function logout() {
  sessionStorage.removeItem("user");
}

let logoutAnchor = document.getElementById("logout");
logoutAnchor.addEventListener("click", logout);

window.onload = () => {
  if (!sessionStorage.getItem("user")) {
    logoutAnchor.click();
    return;
  }

  if (Hls.isSupported()) {
    let video = document.getElementById("video");
    let hls = new Hls();
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log("video and hls.js are now bound together !");
    });
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log(
        "manifest loaded, found " + data.levels.length + " quality level"
      );
    });
    hls.loadSource("http://localhost:3000/video/video.m3u8");
    // bind them together
    hls.attachMedia(video);
  }
};
