const app = require('./config/expressCustomizado');
const conexaoComBancoDeDados = require('./config/conexaoMysql');
const UsuarioDao = require('./repository/usuarioDao');
const dao = UsuarioDao(conexaoComBancoDeDados);

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