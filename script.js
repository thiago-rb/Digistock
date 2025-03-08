document.addEventListener("DOMContentLoaded", function () {
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

//espaço

document.addEventListener('DOMContentLoaded', carregarCategoriasProduto);

function carregarCategoriasProduto() {
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    const select = document.getElementById('produto-categoria');
    select.innerHTML = '<option value="">Selecione uma categoria</option>';

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.nome;
        option.textContent = categoria.nome;
        select.appendChild(option);
    });
}