const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adicionarevento = async (req, res) => {
    try {
        const { nome, data, localizacao, Foto, categoriaEventoId } = req.body;
        const novoEvento = await prisma.evento.create({
            data: {
                nome: nome,
                data: new Date(data),
                localizacao: localizacao,
                Foto: Foto,
                categoriaEventoId: categoriaEventoId
            },
        });
        res.status(201).json(novoEvento);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.listarevento = async (req, res) => {
    try {
        const eventos = await prisma.evento.findMany();
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.editarevento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, data, localizacao, Foto, categoriaEventoId } = req.body;

        // Verifica se o evento existe
        const eventoExistente = await prisma.evento.findUnique({
            where: { id: parseInt(id) },
        });

        if (!eventoExistente) {
            return res.status(404).json({ msg: "Evento não encontrado" });
        }

        // Atualiza o evento
        const eventoAtualizado = await prisma.evento.update({
            where: { id: parseInt(id) },
            data: {
                nome: nome,
                data: data ? new Date(data) : eventoExistente.data,
                localizacao: localizacao,
                Foto: Foto,
                categoriaEventoId: categoriaEventoId
            },
        });

        res.status(200).json(eventoAtualizado);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


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


