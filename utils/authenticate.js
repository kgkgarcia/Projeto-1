require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error('A chave JWT_SECRET não está definida nas variáveis de ambiente.');
}

console.log('Chave JWT carregada:', secret);

exports.generateAccessToken = information => {
    return jwt.sign(information, secret, { expiresIn: '1d' });
};

exports.certifyAccessToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};
