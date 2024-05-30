const privadoRouter = require('express').Router();


// Define uma rota para a página HTML
privadoRouter.get('/admin', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('/Pages/Back/admin.html');
  });


module.exports = privadoRouter;