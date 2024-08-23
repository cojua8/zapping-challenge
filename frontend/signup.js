let loginAnchor = document.createElement("a");
loginAnchor.href = "video.html";

window.onload = () => {
  if (sessionStorage.getItem("key")) {
    loginAnchor.click();
    return;
  }
};
