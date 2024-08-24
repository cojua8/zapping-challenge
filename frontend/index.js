let formElement = document.getElementById("login-form");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("submitting");

  let response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getFormData()),
  });

  if (response.ok) {
    sessionStorage.setItem("user", await response.text());
    window.location.href = "video.html";
  } else {
    console.error("Failed to login");
  }
});

function getFormData() {
  return {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
}
