const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();
app.use(bodyParser.json());

module.exports = app;