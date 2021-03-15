const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();
app.use(bodyParser.json());

app.post("/usuarios", function (req, res) {
    const body = req.body;
    console.log(body);
    res.send("Acessou rota POST /usuarios.");
})


app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000.");
});