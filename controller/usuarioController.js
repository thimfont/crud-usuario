const conexaoComBancoDeDados = require('../config/conexaoMysql');
const UsuarioDao = require('../repository/usuarioDao');
const dao = UsuarioDao(conexaoComBancoDeDados);

module.exports = app => {
    app.get('/usuarios', (req, res) => {
        dao.lista()
            .then(usuarios => res.status(200).json(usuarios))
            .catch(erro => res.status(500).json(erro));
    });

    app.get('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id);
        dao.buscaPorId(id)
            .then(usuario => res.status(200).json(usuario))
            .catch(erro => res.status(500).json(erro));
    });

    app.post('/usuarios', (req, res) => {
        const usuario = req.body;
        dao.salva(usuario)
            .then(resultado => res.status(201).json(resultado.insertId))
            .catch(erro => res.status(500).json(erro));
    });

    app.put('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const usuario = req.body;

        dao.atualiza(usuario, id)
            .then((resultado) => res.status(200).json(resultado.insertId))
            .catch(erro => res.status(500).json(erro));
    })

    app.delete('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id);

        dao.remove(id)
            .then(id => res.status(200).json(id))
            .catch(erro => res.status(500).json(erro));
    });

}