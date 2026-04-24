const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware');
const produtosController = require('../controllers/produtosController');

// 🔐 rota protegida (teste)
router.get('/protegida', verificarToken, (req, res) => {
    res.json({
        message: 'Você acessou uma rota protegida 🔐',
        usuario: req.usuario
    });
});

// 🚀 CRIAR PRODUTO
router.post('/', verificarToken, produtosController.cadastrar);

module.exports = router;