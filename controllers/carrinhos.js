
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//criar um controller adicionarcarrinho que permita que cada utilizador tenha apenas um carrinho associado
exports.adicionaCarrinho = async (req, res) => {
  try {
    const { utilizadorId } = req.params;
    const carrinho = await prisma.carrinho.findFirst({
      where: {
        utilizadorId: parseInt(utilizadorId),
      },
    });
    if (carrinho) {
      return res.status(400).json({ message: "O utilizador já tem um carrinho associado" });
    }
    const novoCarrinho = await prisma.carrinho.create({
      data: {
        utilizadorId: parseInt(utilizadorId),
      },
    });
    return res.status(201).json(novoCarrinho);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar carrinho" });
  }
};


//apaga por id do utilizador
exports.apagarcarrinho = async (req, res) => {
  try {
    const { utilizadorId } = req.params;

    // Verifica se o carrinho existe
    const carrinhoExistente = await prisma.carrinho.findFirst({
      where: {
        utilizadorId: parseInt(utilizadorId),
      },
    });

    if (!carrinhoExistente) {
      return res.status(404).json({ msg: "Carrinho nao encontrado" });
    }

    // Deleta o carrinho
    await prisma.carrinho.delete({
      where: {
        id: carrinhoExistente.id,
      },
    });

    res.status(200).json({ msg: "Carrinho eliminado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
  }
};


exports.listarcarrinhoID = async (req, res) => {
  try {
    const { utilizadorId } = req.params;

    // Check if the shopping cart exists
    const carrinhoExistente = await prisma.carrinho.findFirst({
      where: { utilizadorId: parseInt(utilizadorId) },
    });


    // List the found shopping cart
    return res.status(200).json(carrinhoExistente);
  } catch (error) {
    return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
  }
}
