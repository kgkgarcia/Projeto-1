const express = require('express');
const bilhetesController = require('../controllers/bilhetes');

const router = express.Router();

// Rota para adicionar um bilhete
router.post('/adicionar', bilhetesController.adicionarbilhete);
// Rota para listar todos os bilhetes
router.get('/listar', bilhetesController.listarbilheteALL);
// Rota para listar um unico bilhete 
router.get('/listar/:id', bilhetesController.listarbilheteID);
// Rota para editar um bilhete
router.put('/editar/:id', bilhetesController.editarbilhete);
// Rota para deletar um bilhete
router.delete('/deletar/:id', bilhetesController.apagarbilhete);

module.exports = router;