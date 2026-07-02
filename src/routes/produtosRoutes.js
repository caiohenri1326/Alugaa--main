const express = require('express');
const router = express.Router();
const upload = require('../config/upload');

const verificarToken = require('../middlewares/authMiddleware');
const produtosController = require('../controllers/produtosController');

// 🔐 rota protegida (teste)
router.get('/protegida', verificarToken, (req, res) => {
    res.json({
        message: 'Você acessou uma rota protegida 🔐',
        usuario: req.usuario
    });
});

router.get('/', (req, res) => {
    res.send('ROTA PRODUTOS OK 🚀');
});

// 🚀 CRIAR PRODUTO
router.post('/', verificarToken, upload.single('foto'), produtosController.cadastrar);

module.exports = router;