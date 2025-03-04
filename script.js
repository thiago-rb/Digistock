document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o usuário está logado
    if (sessionStorage.getItem("logado") !== "true" && !window.location.pathname.includes("index.html")) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "index.html";
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "12345") {
                sessionStorage.setItem("logado", "true");
                window.location.href = "Home.html";
            } else {
                document.getElementById("error-message").style.display = "block";
            }
        });
    }
});

function logout() {
    sessionStorage.removeItem("logado");
    window.location.href = "index.html";
}