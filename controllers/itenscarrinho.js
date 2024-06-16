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

        // Verifica se o item já existe no carrinho
        const itemExistente = await prisma.itensCarrinho.findFirst({
            where: {
                carrinhoId: carrinhoId,
                eventoId: eventoId
            }
        });

        if (itemExistente) {
            // Se o item já existe, aumentar a quantidade
            const itemAtualizado = await prisma.itensCarrinho.update({
                where: {
                    id: itemExistente.id
                },
                data: {
                    quantidade: itemExistente.quantidade + quantidade
                }
            });
            return res.status(200).json(itemAtualizado);
        } else {
            // Se o item não existe, adicionar ao carrinho
            const newItem = await prisma.itensCarrinho.create({
                data: {
                    carrinhoId,
                    eventoId,
                    quantidade
                }
            });
            return res.status(201).json(newItem);
        }
    } catch (error) {
        console.error('Erro ao adicionar evento no carrinho:', error);
        return res.status(500).json({ error: 'Erro interno ao adicionar evento no carrinho' });
    }
};
// Controlador para apagar item do carrinho
exports.apagar = async (req, res) => {
    const eventoId = parseInt(req.params.eventoId);

    try {
        // Verifica se o item no carrinho existe
        const itemNoCarrinho = await prisma.itensCarrinho.findUnique({
            where: { id: eventoId }
        });
        if (!itemNoCarrinho) {
            return res.status(404).json({ error: 'Item no carrinho não encontrado' });
        }

        // Apaga o item no carrinho
        await prisma.itensCarrinho.delete({
            where: { id: eventoId }
        });

        return res.status(204).end();
    } catch (error) {
        console.error('Erro ao apagar evento do carrinho por ID:', error);
        return res.status(500).json({ error: 'Erro interno ao apagar evento do carrinho por ID' });
    }
};

// Controlador para editar quantidade de item no carrinho
exports.editarQuantidade = async (req, res) => {
    const eventoId = parseInt(req.params.eventoId);
    const { novaQuantidade } = req.body;

    try {
        // Verifica se o item no carrinho existe
        const itemNoCarrinho = await prisma.itensCarrinho.findUnique({
            where: { id: eventoId }
        });
        if (!itemNoCarrinho) {
            return res.status(404).json({ error: 'Item no carrinho não encontrado' });
        }

        // Calcula a nova quantidade do item no carrinho
        const quantidadeAtualizada = itemNoCarrinho.quantidade + novaQuantidade;

        if (quantidadeAtualizada < 1) {
            // Se a quantidade é menor que 1, remove o item
            await prisma.itensCarrinho.delete({
                where: { id: eventoId }
            });
            return res.status(200).json({ message: 'Item removido do carrinho' });
        } else {
            // Atualiza a quantidade do item no carrinho
            const itemAtualizado = await prisma.itensCarrinho.update({
                where: { id: eventoId },
                data: { quantidade: quantidadeAtualizada }
            });
            return res.status(200).json(itemAtualizado);
        }
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


// Controlador para finalizar a compra e apagar o carrinho do utilizador
exports.finalizarCompra = async (req, res) => {
    const { utilizadorId } = req.params;

    try {
        // Verifica se o carrinho existe
        const carrinhoExistente = await prisma.carrinho.findFirst({
            where: {
                utilizadorId: parseInt(utilizadorId),
            },
            include: {
                itens: true, // Inclui os itens do carrinho
            },
        });

        if (!carrinhoExistente) {
            return res.status(404).json({ msg: "Carrinho não encontrado" });
        }

        // Atualiza a quantidade dos eventos
        for (const item of carrinhoExistente.itens) {
            const evento = await prisma.evento.findUnique({
                where: { id: item.eventoId },
            });

            if (evento.quantidade < item.quantidade) {
                return res.status(400).json({ msg: `Quantidade insuficiente para o evento ${evento.nome}` });
            }

            await prisma.evento.update({
                where: { id: item.eventoId },
                data: {
                    quantidade: evento.quantidade - item.quantidade,
                },
            });
        }

        // Deleta todos os itens do carrinho
        await prisma.itensCarrinho.deleteMany({
            where: {
                carrinhoId: carrinhoExistente.id,
            },
        });

        // Deleta o próprio carrinho
        await prisma.carrinho.delete({
            where: {
                id: carrinhoExistente.id,
            },
        });

        res.status(200).json({ msg: "Compra finalizada e carrinho eliminado com sucesso" });
    } catch (error) {
        console.error("Erro ao finalizar compra e apagar carrinho do utilizador:", error);
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
};
