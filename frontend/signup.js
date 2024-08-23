window.onload = () => {
  if (sessionStorage.getItem("key")) {
    window.location.href = "video.html";
    return;
  }
};
