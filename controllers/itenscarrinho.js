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



const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();