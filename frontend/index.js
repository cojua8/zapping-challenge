function navigate(e) {
  if (!sessionStorage.getItem("key")) e.preventDefault();
}

let videoAnchor = document.getElementById("video-page");
videoAnchor.addEventListener("click", navigate);

window.onload = () => {
  videoAnchor.click();
};
