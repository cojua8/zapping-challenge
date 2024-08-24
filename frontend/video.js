let user = undefined;

let logoutAnchor = document.getElementById("logout");
logoutAnchor.addEventListener("click", () => {
  sessionStorage.removeItem("user");
});

window.onload = () => {
  if (!sessionStorage.getItem("user")) {
    logoutAnchor.click();
    return;
  }
  user = JSON.parse(sessionStorage.getItem("user"));

  document.getElementById(
    "welcome-title"
  ).innerText = `Bienvenido, ${user.name}`;

  configureVideo();
};

function configureVideo() {
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
    hls.loadSource("/video/video.m3u8");
    // bind them together
    hls.attachMedia(video);
  }
}
