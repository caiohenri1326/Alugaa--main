const express = require('express');

const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

const verificarToken = require('../middlewares/authMiddleware');


// 🚀 CADASTRO
router.post(
    '/',
    usuariosController.cadastrar
);


// 🔑 LOGIN
router.post(
    '/login',
    usuariosController.login
);


// 👤 USUÁRIO LOGADO
router.get(
    '/me',
    verificarToken,
    usuariosController.buscarUsuarioLogado
);


// ✏️ ATUALIZAR PERFIL
router.put(
    '/me',
    verificarToken,
    usuariosController.atualizarPerfil
);


module.exports = router;