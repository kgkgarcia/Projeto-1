const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const adminMiddleware = require('./middlewares/auth');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir arquivos estáticos da pasta Pages/Front
app.use(express.static(path.join(__dirname, 'Pages/Front')));

// Especificar o tipo MIME para arquivos CSS
app.use('/Css', express.static(path.join(__dirname, 'Css'), {
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.css') {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Servir arquivos estáticos da pasta Imagens
app.use('/Imagens', express.static(path.join(__dirname, 'Imagens')));

// Rota autenticação
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Rota de Admin (Protegida por Middleware)
const adminRoutes = require('./routes/privado');
app.use('/admin', adminRoutes);

// Rota Eventos
const eventosRoutes = require('./routes/eventos');
app.use('/eventos', eventosRoutes);


//categorias
const categoriasRoutes = require('./routes/categorias');
app.use('/api', categoriasRoutes);

// Porta
const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port);
});
