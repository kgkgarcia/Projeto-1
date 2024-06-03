const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adicionarbilhete = async (req, res) => {
    try {
        const { preco, quantidade, eventoId } = req.body;
        const novoBilhete = await prisma.bilhete.create({
            data: {
                preco: preco,
                quantidade: quantidade,
                eventoId: eventoId
            },
        });
        res.status(201).json(novoBilhete);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.editarbilhete = async (req, res) => {
    try {
        const { id } = req.params;
        const { preco, quantidade, eventoId } = req.body;

        // Verifica se o bilhete existe
        const bilheteExistente = await prisma.bilhete.findUnique({
            where: { id: parseInt(id) },
        });

        if (!bilheteExistente) {
            return res.status(404).json({ msg: "Bilhete não encontrado" });
        }

        // Atualiza o bilhete
        const bilheteAtualizado = await prisma.bilhete.update({
            where: { id: parseInt(id) },
            data: {
                preco: preco,
                quantidade: quantidade,
                eventoId: eventoId
            },
        });

        res.status(200).json(bilheteAtualizado);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}
exports.apagarbilhete = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o bilhete existe
        const bilheteExistente = await prisma.bilhete.findUnique({
            where: { id: parseInt(id) },
        });

        if (!bilheteExistente) {
            return res.status(404).json({ msg: "Bilhete não encontrado" });
        }

        // Deleta o bilhete 
        await prisma.bilhete.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ msg: "Bilhete eliminado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}


exports.listarbilheteALL = async (req, res) => {
    // Lista todos os bilhetes
    try {
        const bilhetes = await prisma.bilhete.findMany();
        return res.status(200).json(bilhetes);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}
exports.listarbilheteID = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o bilhete existe
        const bilheteExistente = await prisma.bilhete.findUnique({
            where: { id: parseInt(id) },
        });

        if (!bilheteExistente) {
            return res.status(404).json({ msg: "Bilhete não encontrado" });
        }

        // Lista aquele o bilhete
        const bilhetes = await prisma.bilhete.findUnique({
            where: { id: parseInt(id) },
        });


        return res.status(200).json(bilhetes);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}

exports.getDetalhesBilheteEvento = async (req, res) => {
    try {
        const { eventId } = req.params;
        const bilhete = await prisma.bilhete.findFirst({
            where: { eventoId: parseInt(eventId) },
        });

        if (!bilhete) {
            return res.status(404).json({ msg: "Bilhete não encontrado para este evento" });
        }

        return res.status(200).json(bilhete);
    } catch (error) {
        return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}







