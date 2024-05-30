const express = require('express');
const eventosController = require('../controllers/eventos');

const router = express.Router();

// Rota para adicionar um evento
router.post('/adicionar', eventosController.adicionarevento);
// Rota para listar todos os eventos
router.get('/listar', eventosController.listarevento);
// Rota para editar um evento
router.put('/editar/:id', eventosController.editarevento);
// Rota para deletar um evento
router.delete('/deletar/:id', eventosController.apagarevento);

module.exports = router;
