const app = require('./config/expressCustomizado');
const mysql = require('mysql');

// database
const conexaoComBancoDeDados = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Thi@g0Root',
    database: 'crud_usuarios'
});

const sql = 'CREATE TABLE IF NOT EXISTS Usuarios(id int NOT NULL AUTO_INCREMENT, ' +
    'nome varchar(50) NOT NULL, ' +
    'email varchar(30) NOT NULL, ' +
    'cadastro datetime NOT NULL, ' +
    'renda double,' +
    'PRIMARY KEY(id))';
conexaoComBancoDeDados.query(sql, erro => {
    if (erro) {
        console.log(`Erro ao criar tabela: ${erro}`);
    } else {
        console.log('Tabela criada.')
    }
});

// rotas
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM Usuarios';
    conexaoComBancoDeDados.query(sql, (erro, resultado) => {
        if (erro) {
            res.status(400).json(erro);
        } else {
            res.status(200).json(resultado);
        }
    })
});

app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM Usuarios WHERE id = ${id}`;
    conexaoComBancoDeDados.query(sql, (erro, resultado) => {
        if (erro) {
            res.status(400).json(erro);
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.post('/usuarios', (req, res) => {
    const usuario = req.body;
    const sql = "INSERT INTO Usuarios set ?";
    conexaoComBancoDeDados.query(sql, usuario, (erro, resultado) => {
        if (erro) {
            res.status(400).json(erro);
        } else {
            res.status(201).json(usuario);
        }
    });
});

app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = req.body;
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    conexaoComBancoDeDados.query(sql, [usuario, id], (erro, resultado) => {
        if (erro) {
            res.status(400).json(erro);
        } else {
            res.status(200).json({ ...usuario, id });
        }
    })
})

app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = 'DELETE FROM Usuarios WHERE id = ?';
    conexaoComBancoDeDados.query(sql, id, erro => {
        if (erro) {
            res.status(400).json(erro);
        } else {
            res.status(200).json(id);
        }
    });
});

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000.");
});