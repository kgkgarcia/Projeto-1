const express = require('express');
const eventosController = require('../controllers/eventos');

const router = express.Router();

// Rota para adicionar um evento
router.post('/adicionar', eventosController.adicionarevento);
// Rota para listar todos os eventos
router.get('/listar', eventosController.listareventoALL);
// Rota para listar o evento daquele ID
router.get('/listar/:id', eventosController.listareventoID);
// Rota para listar todos os eventos daquela categoria
router.get('/listarcat/:categoriaEventoId', eventosController.listareventoCAT);
// Rota para listar o evento com aquele nome
router.get('/listarnome/:nome', eventosController.listareventoNOME);
// Rota para editar um evento
router.put('/editar/:id', eventosController.editarevento);
// Rota para deletar um evento
router.delete('/deletar/:id', eventosController.apagarevento);

module.exports = router;
