const express = require('express');
const privadoRouter = express.Router();

// Define uma rota para a página HTML, protegida pelo middleware de admin
privadoRouter.get('/',  (req, res) => {
  
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile('/Documentos/2º ANO ERSC/PW/Pojeto 1/Pages/Back/admin.html');
});

module.exports = privadoRouter;
