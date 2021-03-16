class UsuarioDao {
    constructor(conexao) {
        this.conexao = conexao;
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

    lista() {
        const sql = 'SELECT * FROM Usuarios';

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, (erro, resultado) => {
                if (erro) reject(erro);

                resolve(resultado);
            });
        });
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Usuarios WHERE id = ${id}`;

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, (erro, resultado) => {
                if (erro) reject(erro);

                resolve(resultado);
            });
        });
    }

    salva(usuario) {
        const sql = "INSERT INTO Usuarios set ?";

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, usuario, (erro, resultado) => {
                if (erro) reject(erro);
                resolve(resultado);
            });
        });
    }

    atualiza(usuario, id) {
        const sql = "UPDATE Usuarios SET ? WHERE id = ?";

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, [usuario, id], (erro, resultado) => {
                if (erro) reject(erro);
                console.log(resultado);
                resolve(resultado);
            });
        });
    }

    remove(id) {
        const sql = 'DELETE FROM Usuarios WHERE id = ?';

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, id, erro => {
                if (erro) reject(erro);

                resolve(id);
            });
        });
    }

}

module.exports = (conexao) => new UsuarioDao(conexao)