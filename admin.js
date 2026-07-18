const USERNAME = "LHG";
const PASSWORD = "Lhg@0220";

const loginBtn = document.getElementById("loginBtn");
const error = document.getElementById("error");

loginBtn.addEventListener("click", login);

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === USERNAME && password === PASSWORD) {

        sessionStorage.setItem("lhgAdmin", "true");

        window.location.href = "dashboard.html";

    } else {

        error.textContent = "Invalid Username or Password";

    }

}