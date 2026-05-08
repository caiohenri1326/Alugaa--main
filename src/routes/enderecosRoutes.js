const express = require('express');

const router = express.Router();

const enderecosController = require('../controllers/enderecosController');

const verificarToken = require('../middlewares/authMiddleware');

// 🚀 criar endereço
router.post(
    '/',
    verificarToken,
    enderecosController.criarEndereco
);

// 🔍 listar endereços
router.get(
    '/',
    verificarToken,
    enderecosController.listarEnderecos
);

// ❌ excluir endereço
router.delete(
    '/:id',
    verificarToken,
    enderecosController.excluirEndereco
);

module.exports = router;