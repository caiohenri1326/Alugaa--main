const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuariosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
<<<<<<< HEAD
const enderecosRoutes = require('./routes/enderecosRoutes');
=======
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

const app = express();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use('/uploads', express.static('uploads'));
=======
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

// ROTAS
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/produtos', produtosRoutes);
<<<<<<< HEAD
app.use('/api/enderecos', enderecosRoutes);
=======
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

// TESTE
app.get('/teste', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

// 🔥 listen sempre no final
app.listen(3000, () => {
    console.log('Servidor rodando 🚀');
});

<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
