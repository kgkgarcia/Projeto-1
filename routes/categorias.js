const express = require('express');
const router = express.Router();
const { listarCategorias } = require('../controllers/categorias');

// Rota para listar todas as categorias
router.get('/categorias', listarCategorias);

module.exports = router;