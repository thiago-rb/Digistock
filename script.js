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

// Função para carregar categorias
function carregarCategorias() {
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    const tabela = document.getElementById('tabela-categorias');
    tabela.innerHTML = '';

    categorias.forEach((categoria, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${categoria.nome}</td>
            <td>
                <button class="btn btn-delete" onclick="excluirCategoria(${index})">Excluir</button>
            </td>
        `;
        tabela.appendChild(row);
    });
}

// Função para adicionar uma nova categoria
function adicionarCategoria() {
    const nome = document.getElementById('categoria-nome').value.trim();

    if (nome === '') {
        alert('Por favor, insira o nome da categoria.');
        return;
    }

    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    categorias.push({ nome });
    localStorage.setItem('categorias', JSON.stringify(categorias));

    limparFormulario();
    carregarCategorias();
}

// Função para excluir uma categoria
function excluirCategoria(index) {
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    categorias.splice(index, 1);
    localStorage.setItem('categorias', JSON.stringify(categorias));
    carregarCategorias();
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('categoria-nome').value = '';
}

// Carrega as categorias ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCategorias);