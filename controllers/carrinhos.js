
/*
DE ACORDO COM ESTA TABELA AJUSTAR AS FUNCOES PARA CRIAR, LISTAR, LISTAR POR ID, APAGAR CARRINHO E APAGAR TODOS OS ITENS DO CARINHO
model Carrinho {
    id           Int             @id @default(autoincrement())
    utilizadorId Int
    utilizador   Utilizador      @relation(fields: [utilizadorId], references: [id])
    itens        ItensCarrinho[]
}

*/ 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();























exports.adicionarcarrinho = async (req, res) => {
    try {
        const { utilizador, utilizadorId, ItensCarrinho } = req.body;
        const novoCarrinho = await prisma.carrinho.create({
            data: {
                utilizador: utilizador,
                utilizadorId: utilizadorId,
                ItensCarrinho: ItensCarrinho
            },
        });
        res.status(201).json(novoCarrinho);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.editarcarrinho = async (req, res) => {
    try {
        const { id } = req.params;
        const { utilizador, utilizadorId, ItensCarrinho } = req.body;

        // Verifica se o carrinho existe
        const carrinhoExistente = await prisma.carrinho.findUnique({
            where: { id: parseInt(id) },
        });

        if (!carrinhoExistente) {
            return res.status(404).json({ msg: "Essa compra não foi encontrada" });
        }

        // Atualiza o carrinho
        const carrinhoAtualizado = await prisma.carrinho.update({
            where: { id: parseInt(id) },
            data: {
                utilizador: utilizador,
                utilizadorId: utilizadorId,
                ItensCarrinho: ItensCarrinho
            },
        });

        res.status(200).json(carrinhoAtualizado);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}
exports.apagarcarrinho = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o carrinho existe
        const carrinhoExistente = await prisma.carrinho.findUnique({
            where: { id: parseInt(id) },
        });

        if (!carrinhoExistente) {
            return res.status(404).json({ msg: "Essa compra não foi encontrada" });
        }

        // Deleta o carrinho 
        await prisma.carrinho.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ msg: "Compra eliminada com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.listarcarrinhoALL = async (req, res) => {
    // Lista todos os carrinhos (todas as compras feitas)
    try {
        const carrinho = await prisma.carrinho.findMany();
        return res.status(200).json(carrinho);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}
//lista a compra por ID
exports.listarcarrinhoID = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o carrinho existe
        const carrinhoExistente = await prisma.carrinho.findUnique({
            where: { id: parseInt(id) },
        });

        if (!carrinhoExistente) {
            return res.status(404).json({ msg: "Essa compra não foi encontrada" });
        }

        // Lista aquele o carrinho
        const carrinho = await prisma.carrinho.findUnique({
            where: { id: parseInt(id) },
        });


        return res.status(200).json(carrinho);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}
//vai buscar o carrinho de um utilizador 
exports.getDetalhesCarrinhoUtilizador = async (req, res) => {
    try {
        const { utilizadorId } = req.params;
        const carrinho = await prisma.carrinho.findFirst({
            where: { utilizadorId: parseInt(utilizadorId) },
        });

        if (!carrinho) {
            return res.status(404).json({ msg: "Compra não encontrada para este utilizador" });
        }

        return res.status(200).json(carrinho);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}