/*
DE ACORDO COM ESTA TABELA, CRIAR OS CONTROLLES NECESSARIO PARA ADICIONAR UM EVENTO NO CARRINHO, APAGAGAR (UM POR ID), EDITAR E LISTAR
model ItensCarrinho {
    id         Int      @id @default(autoincrement())
    carrinhoId Int
    carrinho   Carrinho @relation(fields: [carrinhoId], references: [id])
    eventoId   Int
    evento     Evento   @relation(fields: [eventoId], references: [id])
    quantidade Int
}

 */


// controllers/carrinhoControllers.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller para adicionar um evento ao carrinho
exports.adicionar = async (req, res) => {
    const { carrinhoId, eventoId, quantidade } = req.body;

    try {
        // Verifica se o carrinho existe
        const carrinho = await prisma.carrinho.findUnique({
            where: { id: carrinhoId }
        });
        if (!carrinho) {
            return res.status(404).json({ error: 'Carrinho não encontrado' });
        }

        // Verifica se o evento existe
        const evento = await prisma.evento.findUnique({
            where: { id: eventoId }
        });
        if (!evento) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        // Cria o item no carrinho
        const newItem = await prisma.itensCarrinho.create({
            data: {
                carrinhoId,
                eventoId,
                quantidade
            }
        });

        return res.status(201).json(newItem);
    } catch (error) {
        console.error('Erro ao adicionar evento no carrinho:', error);
        return res.status(500).json({ error: 'Erro interno ao adicionar evento no carrinho' });
    }
};

// Controller para apagar um evento do carrinho por ID
exports.apagar = async (req, res) => {
    const itemId = parseInt(req.params.itemId);

    try {
        // Verifica se o item no carrinho existe
        const itemNoCarrinho = await prisma.itensCarrinho.findUnique({
            where: { id: itemId }
        });
        if (!itemNoCarrinho) {
            return res.status(404).json({ error: 'Item no carrinho não encontrado' });
        }

        // Apaga o item no carrinho
        await prisma.itensCarrinho.delete({
            where: { id: itemId }
        });

        return res.status(204).end();
    } catch (error) {
        console.error('Erro ao apagar evento do carrinho por ID:', error);
        return res.status(500).json({ error: 'Erro interno ao apagar evento do carrinho por ID' });
    }
};

// Controller para editar a quantidade de um evento no carrinho
exports.editarQuantidade = async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const { novaQuantidade } = req.body;

    try {
        // Verifica se o item no carrinho existe
        const itemNoCarrinho = await prisma.itensCarrinho.findUnique({
            where: { id: itemId }
        });
        if (!itemNoCarrinho) {
            return res.status(404).json({ error: 'Item no carrinho não encontrado' });
        }

        // Atualiza a quantidade do item no carrinho
        const itemAtualizado = await prisma.itensCarrinho.update({
            where: { id: itemId },
            data: { quantidade: novaQuantidade }
        });

        return res.status(200).json(itemAtualizado);
    } catch (error) {
        console.error('Erro ao editar quantidade do evento no carrinho:', error);
        return res.status(500).json({ error: 'Erro interno ao editar quantidade do evento no carrinho' });
    }
};

// Controller para listar todos os eventos no carrinho
exports.listar = async (req, res) => {
    const carrinhoId = parseInt(req.params.carrinhoId);

    try {
        // Busca todos os itens no carrinho para o carrinho especificado
        const itensNoCarrinho = await prisma.itensCarrinho.findMany({
            where: { carrinhoId },
            include: {
                evento: true // Inclui os detalhes completos do evento associado
            }
        });

        return res.status(200).json(itensNoCarrinho);
    } catch (error) {
        console.error('Erro ao listar eventos no carrinho:', error);
        return res.status(500).json({ error: 'Erro interno ao listar eventos no carrinho' });
    }
};
