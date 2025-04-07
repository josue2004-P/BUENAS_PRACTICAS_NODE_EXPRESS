const { getPrisma } = require("../database/prisma");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


const prisma = getPrisma(); 

const getAllUsuarios = async () =>{

    const usuarios = await prisma.bUENAS_PRACTICAS_01_USUARIO.findMany();
    return usuarios;
}

const newUsuario = async (name,email, password) => {

    let usuario = await prisma.bUENAS_PRACTICAS_01_USUARIO.findFirst({
        where: {
          sEmail: email,
        },
      });

      if (usuario) {
        throw new Error("El correo electrónico ya está registrado.");
    }
    
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    // Crear el usuario en la base de datos
    const newUser = await prisma.bUENAS_PRACTICAS_01_USUARIO.create({
        data: {
            sEmail: email,
            sPassword: newPassword,
            sName: name,
        },
    });

    // Generar JWT
    const token = await generarJWT(newUser.id, newUser.nombre);
    
    return {
        user: newUser,
        token,
    };
}

module.exports = {
    getAllUsuarios,
    newUsuario,
}