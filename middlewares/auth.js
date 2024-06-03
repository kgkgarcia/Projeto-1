const authenticateUtil = require('../utils/authenticate.js');

module.exports = async (req, res, next) => {
    const accessToken = req.headers['authorization'];

    console.log("Token recebido:", accessToken);

    if (!accessToken) {
        console.log("Token não encontrado na solicitação.");
        return res.status(401).send("Você não está autenticado.");
    }

    try {
        const bearer = accessToken.split(' ');
        const bearerToken = bearer[1];

        const result = await authenticateUtil.certifyAccessToken(bearerToken);
        console.log("Dados do usuário autenticado:", result);

        req.user = {
            id: result.id,
            name: result.name,
            isAdmin: result.isAdmin
        };

        if (!result.isAdmin) {
            console.log("Usuário não é administrador.");
            return res.status(403).send("Acesso negado. Apenas administradores podem acessar esta rota.");
        }

        return next();
    } catch (err) {
        console.error("Erro durante a autenticação do usuário:", err);
        return res.status(401).send("Erro ao autenticar o usuário.");
    }
};
