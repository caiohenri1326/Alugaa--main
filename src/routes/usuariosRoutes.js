const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/', usuariosController.cadastrar);
router.post('/login', usuariosController.login);

router.get('/me', verificarToken, usuariosController.buscarPerfil);

module.exports = router;