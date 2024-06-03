const express = require('express');
const privadoRouter = express.Router();
const adminMiddleware = require('../middlewares/auth');

// Define uma rota para a página HTML, protegida pelo middleware de admin
privadoRouter.get('/admin', adminMiddleware, (req, res) => {
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile('/Pages/Back/admin.html');
});

module.exports = privadoRouter;
