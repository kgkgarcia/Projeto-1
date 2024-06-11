const authenticateUtil = require('../utils/authenticate.js');

module.exports = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    
    console.log(req.headers);
    
    if (!accessToken) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const bearer = accessToken.split(' ');
        const bearerToken = bearer[1];
        
        const result = await authenticateUtil.certifyAccessToken(bearerToken);
        
        // Verifica se o usuário é um administrador
        if (!result.isAdmin) {
            return res.status(403).send("Forbidden: Access denied. Only administrators are allowed.");
        }
        
        // Adicione o nome do usuário autenticado ao corpo da solicitação, se necessário
        req.body.loggedUserName = result.Name;

        // Continue para o próximo middleware
        return next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
}
