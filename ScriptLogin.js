document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    // Verifica se o usuário já está logado
    if (sessionStorage.getItem("logado") === "true" && window.location.pathname.includes("index.html")) {
        window.location.href = "TelaCadForn.html";
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "12345") {
                alert("Login bem-sucedido!");
                sessionStorage.setItem("logado", "true");
                window.location.href = "TelaCadForn.html";
            } else {
                document.getElementById("error-message").style.display = "block";
            }
        });
    }
});

// Verifica login antes de abrir Tela.html
if (window.location.pathname.includes("TelaCadForn.html")) {
    if (sessionStorage.getItem("logado") !== "true") {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "index.html";
    }
}

// Função de logout
function logout() {
    sessionStorage.removeItem("logado");
    window.location.href = "index.html";
}
