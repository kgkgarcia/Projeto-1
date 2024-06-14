
const express = require('express');
const carrinhosController = require('../controllers/carrinhos');


const router = express.Router();


// Rota para criar um carrinho
router.post('/adicionar/:utilizadorId', carrinhosController.adicionaCarrinho);
// Rota para listar o carrinho daquele ID
router.get('/listar/:utilizadorId', carrinhosController.listarcarrinhoID);
// Rota para deletar um carrinho
router.delete('/deletar/:utilizadorId', carrinhosController.apagarcarrinho);

module.exports = router;