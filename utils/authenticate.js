const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    return jwt.sign(user, 'seuSegredoJWT', { expiresIn: '1h' });
};

exports.certifyAccessToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'seuSegredoJWT', (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};
