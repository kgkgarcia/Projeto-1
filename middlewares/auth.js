const authenticateUtil = require('../utils/authenticate.js');

module.exports = async (req, res, next) => {
    const accessToken = req.body.token;

    if (!accessToken) {
        console.log(accessToken)
        return res.status(401).send("Unauthorized: Missing access token.");
    }

    try {
        const result = await authenticateUtil.certifyAccessToken(accessToken);

        // Verifica se o usuário é um administrador
        if (!result.isAdmin) {
            return res.status(403).send("Forbidden: Access denied. Only administrators are allowed.");
        }

        // Adiciona o nome do usuário autenticado ao corpo da solicitação, se necessário
        req.loggedUserName = result.name; // Corrigido para 'name' em vez de 'Name'

        // Continue para o próximo middleware
        next();
    } catch (err) {
        if (err instanceof SyntaxError && err.message.includes('Unexpected token')) {
            // Se o erro for causado por um JSON inválido, envie uma mensagem mais genérica
            return res.status(401).send("Unauthorized: Invalid access token.");
        } else {
            // Se não for um erro de parsing JSON, retorne um erro interno do servidor
            console.error(err);
            return res.status(500).send("Internal Server Error.");
        }
    }
}
