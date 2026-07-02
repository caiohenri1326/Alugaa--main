const express = require('express');
const router = express.Router();

const enderecosController = require('../controllers/enderecosController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, enderecosController.listar);
router.post('/', verificarToken, enderecosController.criar);
router.put('/:id', verificarToken, enderecosController.atualizar);
router.delete('/:id', verificarToken, enderecosController.remover);

module.exports = router;
