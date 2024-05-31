const authenticateUtil = require('../utils/authenticate.js');

module.exports = async (req, res, next) => {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
        return res.status(401).send("Não está autorizado");
    }

    try {
        const bearer = accessToken.split(' ');
        const bearerToken = bearer[1];

        const result = await authenticateUtil.certifyAccessToken(bearerToken);
        req.user = {
            id: result.id,
            name: result.name,
            isAdmin: result.isAdmin
        };

        if (!result.isAdmin) {
            return res.status(403).send("Acesso negado. Apenas administradores podem acessar esta rota.");
        }

        return next();
    } catch (err) {
        return res.status(401).send("Não está autorizado");
    }
};
