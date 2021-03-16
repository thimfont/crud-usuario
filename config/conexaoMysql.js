const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Thi@g0Root',
    database: 'crud_usuarios'
});

module.exports = conexao;