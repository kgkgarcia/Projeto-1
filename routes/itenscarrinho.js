const express = require('express');
const itensController = require('../controllers/itenscarrinho');

const router = express.Router();

// Rota para adicionar um evento ao carrinho
router.post('/adicionarEvento', itensController.adicionar);
// Rota para apagar um evento do carrinho por ID
router.delete('/apagarEvento/:eventoId', itensController.apagar);
// Rota para editar a quantidade de um evento no carrinho
router.put('/editarQuantidade/:eventoId', itensController.editarQuantidade);
// Rota para listar todos os eventos no carrinho de um determinado carrinhoId
router.get('/listarEventos/:carrinhoId', itensController.listar);
// rota para realizar compra
router.post('/finalizarCompra/:utilizadorId', itensController.finalizarCompra);

module.exports = router;
