window.onload = () => {
  if (sessionStorage.getItem("user")) {
    window.location.href = "video.html";
    return;
  }
};

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("submitting");

  let response = await fetch("/users/register", {
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
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirm-password").value,
  };
}

document
  .getElementById("set-form-values-button")
  .addEventListener("click", async (e) => {
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "john@doe.com";
    document.getElementById("password").value = "password";
    document.getElementById("confirm-password").value = "password";
  });
