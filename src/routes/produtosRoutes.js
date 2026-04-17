const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware');

// rota protegida
router.get('/protegida', verificarToken, (req, res) => {
    res.json({
        message: 'Você acessou uma rota protegida 🔐',
        usuario: req.usuario
    });
});

module.exports = router;