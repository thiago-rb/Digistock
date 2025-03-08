const fs = require('fs'); //permite interagir com o sistema de arquivos
const https = require('https'); //cria servidor HTTPS
const express = require('express'); //gerencia rotas HTTP
const bcrypt = require('bcryptjs'); //hashing de senhas, segurança para armazenar senhas no banco de dados
const mysql = require('mysql2'); //interage e conecta com mysql
const path = require('path'); //caminhos de arquivos e diretorios
const rateLimit = require('express-rate-limit'); //limita o numero de requisições para evitar ataques
const helmet = require('helmet'); //melhora a segurança do express

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Helmet para melhorar a segurança HTTP
app.use(helmet());

// Configurar o limite de tentativas de login
const loginLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limite de 5 tentativas por IP
    message: 'Muitas tentativas de login. Por favor, tente novamente mais tarde. '
});

// Configurar conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_digistock'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySql.');
});

// Rota de cadastro
app.post('/register', (req, res) => {
    const { nome, senha, tipo_usuario } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 10);
    const data_criacao = new Date();

    db.query('INSERT INTO usuario_tb (nome, senha, tipo_usuario, data_criacao) VALUES (?, ?, ?, ?)', [nome, hashedPassword, tipo_usuario, data_criacao], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao cadastrar usuário. ');
        }
        res.send('Cadastro realizado com sucesso!');
    });
});

// Rota de login com limite de tentativas
app.post('/login', loginLimiter, (req, res) => {
    const { nome, senha } = req.body;

    db.query('SELECT senha FROM usuario_tb WHERE nome = ?', [nome], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao realizar login.');
        }
        if (results.length > 0 && bcrypt.compareSync(senha, results[0].senha)) {
            res.send('Login realizado com sucesso!');
        } else {
            res.status(401).send('Usuário ou senha incorretos.')
        }
    });
});

// Caminho dos arquivos de certificado SSL
const sslOptions = {
    key: fs.readFileSync('C:\\Users\\thiag\\OneDrive\\Documentos\\PCC - Digistock\\Digistock v2\\key.pem'),
    cert: fs.readFileSync('C:\\Users\\thiag\\OneDrive\\Documentos\\PCC - Digistock\\Digistock v2\\cert.pem')
};

const PORT = process.env.PORT || 3000;
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log('Servidor rodando na porta ${3306} com HTTPS');
}); 