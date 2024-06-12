const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateUtil = require('../utils/authenticate.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.register = async (req, res) => {
    try {
        const { name, email, password, isAdmin, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.utilizador.create({
            data: {
                email: email,
                nome: name,
                numtel: phone,
                password: hashedPassword,
                isAdmin: isAdmin
            },
        })
        return this.login(req, res);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.utilizador.findUnique({
            where: { email: email }
        });

        if (user) {
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (passwordIsValid) {
                const { password, ...userWithoutPassword } = user;
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.nome, isAdmin: user.isAdmin });
                res.status(200).json({ token: accessToken, user: userWithoutPassword });
            } else {
                res.status(401).json({ msg: "Password inválida!" });
            }
        } else {
            res.status(404).json({ msg: "Usuário não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}



exports.getUserInfo = async (req, res) => {
    try {
        // Obtendo o ID do usuário do token de autenticação
        const userId = req.user.id;

        // Buscando as informações do usuário no banco de dados
        const user = await prisma.utilizador.findUnique({
            where: { id: userId }
        });

        if (user) {
            // Se o usuário for encontrado, retornamos suas informações
            res.status(200).json({ name: user.nome, email: user.email, isAdmin: user.isAdmin });
        } else {
            // Se o usuário não for encontrado, retornamos um erro 404
            res.status(404).json({ msg: "Usuário não encontrado!" });
        }
    } catch (error) {
        // Se ocorrer algum erro interno, retornamos um erro 500
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
};



//ver o token
exports.readToken = async (req, res) => {
    const { token } = req.body;
    try {
        const result = await authenticateUtil.certifyAccessToken(token);
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado', error: err.message });
    }
};
