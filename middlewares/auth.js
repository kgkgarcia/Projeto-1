const authenticateUtil = require('../utils/authenticate.js');

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.header('Authorization');
        
        if (!accessToken) {
            return res.status(401).send("Unauthorized: Missing access token.");
        }

        const cleanToken = accessToken.replace('Bearer ', '');
        const result = await authenticateUtil.certifyAccessToken(cleanToken);

        if (!result.isAdmin) {
            return res.status(403).send("Forbidden: Access denied. Only administrators are allowed.");
        }

        req.loggedUserName = result.name;

        next();
    } catch (err) {
        if (err instanceof SyntaxError && err.message.includes('Unexpected token')) {
            return res.status(401).send("Unauthorized: Invalid access token.");
        } else {
            console.error(err);
            return res.status(500).send("Internal Server Error.");
        }
    }
}
