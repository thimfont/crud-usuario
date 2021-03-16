const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

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


// database fake
const usuarios = [];
usuarios.push({ 'cadastro': '15/03/2021', 'nome': 'Thiago', 'renda': '1000', 'email': 'thiago@gmail.com' });
usuarios.push({ 'cadastro': '14/03/2021', 'nome': 'Rose', 'renda': '500', 'email': 'rose@gmail.com' });

// rotas
app.get('/usuarios', (req, res) => {
    res.status(200).send(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    const usuario = usuarios[id];
    res.status(200).send(usuario);
});

app.post('/usuarios', (req, res) => {
    const usuario = req.body;
    usuarios.push(usuario);
    res.status(201).send('Usuário salvo com sucesso.');
});

app.put('/usuarios/:id', (req, res) => {
    const posicao = parseInt(req.params.id) - 1;
    const atualizado = req.body;

    usuarios[posicao].renda = atualizado.renda;

    res.status(200).send('Atualizado.');
})

app.delete('/usuarios/:id', (req, res) => {
    const posicao = parseInt(req.params.id) - 1;
    usuarios.splice(posicao, 1);
    res.status(200).send(`Usuário com ${posicao} foi removido com sucesso`);
});


app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000.");
});