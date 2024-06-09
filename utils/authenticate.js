const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.generateAccessToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

exports.certifyAccessToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};
