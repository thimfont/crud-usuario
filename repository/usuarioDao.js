class UsuarioDao {
    constructor(conexao) {
        this.conexao = conexao
        this.inicializador();
    }

    inicializador() {
        const sql = 'CREATE TABLE IF NOT EXISTS Usuarios(id int NOT NULL AUTO_INCREMENT, ' +
            'nome varchar(50) NOT NULL, ' +
            'email varchar(30) NOT NULL, ' +
            'cadastro datetime NOT NULL, ' +
            'renda double,' +
            'PRIMARY KEY(id))';

        this.conexao.query(sql, erro => {
            if (erro) console.log(`Erro ao criar tabela: ${erro}`);
            else console.log('Tabela criada.')
        });
    }
}

module.exports = (conexao) => new UsuarioDao(conexao)