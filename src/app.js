const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuariosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/produtos', produtosRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando 🚀');
});

module.exports = app;