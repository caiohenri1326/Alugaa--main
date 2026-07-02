const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');
const verificarToken = require('../middlewares/authMiddleware');
<<<<<<< HEAD
const upload = require('../config/upload');
=======
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe

router.post('/', usuariosController.cadastrar);
router.post('/login', usuariosController.login);

router.get('/me', verificarToken, usuariosController.buscarPerfil);
<<<<<<< HEAD
router.put('/me', verificarToken, upload.single('foto_perfil'), usuariosController.atualizarPerfil);
router.put('/me/email', verificarToken, usuariosController.atualizarEmail);
router.put('/me/senha', verificarToken, usuariosController.atualizarSenha);
router.delete('/me', verificarToken, usuariosController.excluirConta);

module.exports = router;
=======

module.exports = router;
>>>>>>> 0f929d66d2d23f2199d12324228f0318e7e4aabe
