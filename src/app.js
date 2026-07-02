const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuariosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const enderecosRoutes = require('./routes/enderecosRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ROTAS
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/enderecos', enderecosRoutes);

// TESTE
app.get('/teste', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

// 🔥 listen sempre no final
app.listen(3000, () => {
    console.log('Servidor rodando 🚀');
});

module.exports = app;
