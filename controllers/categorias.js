const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para listar todas as categorias
exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await prisma.categoriaEvento.findMany();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
};