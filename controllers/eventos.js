const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adicionarevento = async (req, res) => {
    const { nome, data, localizacao, foto, descricao, categoriaEventoId, preco, quantidade } = req.body;
    try {
        const evento = await prisma.evento.create({
            data: {
                nome,
                data: new Date(data),
                localizacao,
                foto,
                descricao,
                categoriaEventoId,
                preco,
                quantidade
            }
        });
        res.status(201).json(evento);
    } catch (error) {
        console.error("Erro ao adicionar o evento:", error);
        res.status(500).json({ error: "Não foi possível adicionar o evento" });
    }
};




exports.editarevento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, data, localizacao, foto, descricao, categoriaEventoId, preco, quantidade } = req.body;

        const evento = await prisma.evento.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                data: new Date(data),
                localizacao,
                foto,
                descricao,
                categoriaEventoId,
                preco,
                quantidade
            }
        });

        res.status(200).json({ evento });
    } catch (error) {
        console.error("Erro ao editar o evento:", error);
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
};



exports.apagarevento = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o evento existe
        const eventoExistente = await prisma.evento.findUnique({
            where: { id: parseInt(id) },
        });

        if (!eventoExistente) {
            return res.status(404).json({ msg: "Evento não encontrado" });
        }

        // Deleta o evento
        await prisma.evento.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ msg: "Evento deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.listareventoALL = async (req, res) => {
    try {
        const eventos = await prisma.evento.findMany();
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}

exports.listareventoID = async (req, res) => {
    try {
        const { id } = req.params;
        // Busca o evento pelo ID
        const evento = await prisma.evento.findUnique({
            where: { id: parseInt(id) },
        });

        if (!evento) {
            return res.status(404).json({ msg: "Evento não encontrado" });
        }

        return res.status(200).json(evento);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}

exports.listarPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        // Busca os eventos pela categoria
        const eventos = await prisma.evento.findMany({
            where: {
                categoriaEventoId: parseInt(categoria), // Alteração aqui
            },
        });

        if (!eventos || eventos.length === 0) {
            return res.status(404).json({ msg: "Nenhum evento encontrado para esta categoria" });
        }

        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
};


exports.listareventoNOME = async (req, res) => {
    try {
        const { nome } = req.params;
        // Verifica se o evento existe
        const eventoExistente = await prisma.evento.findUnique({
            where: { nome: parseInt(nome) },
        });

        if (!eventoExistente) {
            return res.status(404).json({ msg: "Evento não encontrado" });
        }
        // Lista aquele o evento 
        const evento = await prisma.evento.findUnique({
            where: { nome: parseInt(nome) },
        });

        return res.status(200).json(evento);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.pesquisarEvento = async (req, res) => {
    try {
        const { pesquisa } = req.query;
        if (!pesquisa) {
            return res.status(400).json({ msg: "Por favor, forneça um termo de pesquisa válido" });
        }
        // Search for events by name or description
        const eventos = await prisma.evento.findMany({
            where: {
                OR: [
                    { nome: { contains: pesquisa, mode: 'insensitive' } }, 
                    { descricao: { contains: pesquisa, mode: 'insensitive' } },
                    { descricao: { contains: pesquisa, mode: 'insensitive' } },
                    { localizacao: { contains: pesquisa, mode: 'insensitive' } },
                ],
            },
        });

        if (!eventos || eventos.length === 0) {
            return res.status(404).json({ msg: "Nenhum evento encontrado para a pesquisa: " + pesquisa });
        }

        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
};
