
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.adicionarcarrinho = async (req, res) => {
    try {
        const { utilizadorId } = req.body;
        const novoCarrinho = await prisma.carrinho.create({
            data: {
                utilizadorId: utilizadorId,
            },
        });
        res.status(201).json(novoCarrinho);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
    }
}

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
        return res.status(404).json({ msg: "Essa compra não foi encontrada" });
      }
  
      // Deleta o carrinho
      await prisma.carrinho.delete({
        where: {
          id: carrinhoExistente.id,
        },
      });
  
      res.status(200).json({ msg: "Compra eliminada com sucesso" });
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
  
          if (!carrinhoExistente) {
              return res.status(404).json({ msg: "Esse carrinho não foi encontrado" });
          }
  
          // List the found shopping cart
          return res.status(200).json(carrinhoExistente);
      } catch (error) {
          return res.status(500).json({ msg: "Erro interno do servidor: " + error.message });
      }
  }

