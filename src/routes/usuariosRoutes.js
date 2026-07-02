const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');
const verificarToken = require('../middlewares/authMiddleware');
const upload = require('../config/upload');

router.post('/', usuariosController.cadastrar);
router.post('/login', usuariosController.login);

router.get('/me', verificarToken, usuariosController.buscarPerfil);
router.put('/me', verificarToken, upload.single('foto_perfil'), usuariosController.atualizarPerfil);
router.put('/me/email', verificarToken, usuariosController.atualizarEmail);
router.put('/me/senha', verificarToken, usuariosController.atualizarSenha);
router.delete('/me', verificarToken, usuariosController.excluirConta);

module.exports = router;
