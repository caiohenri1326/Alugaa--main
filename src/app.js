const express = require('express');
const app = express();
const produtosRoutes = require('./routes/produtosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');


app.use('/api/produtos', produtosRoutes);

app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);

module.exports = app;