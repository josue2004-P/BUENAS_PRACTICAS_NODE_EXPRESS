const { PrismaClient,Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUsuarios = async () =>{

    const usuarios = await prisma.bUENAS_PRACTICAS_01_USUARIO.findMany();
    return usuarios;
}

module.exports = {
    getAllUsuarios,
}