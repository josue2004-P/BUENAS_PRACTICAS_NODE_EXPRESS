const { getPrisma } = require("../database/prisma");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");


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
    const token = await generarJWT(newUser.nId01Usuario, newUser.sName);
    
    return {
        user: newUser,
        token,
    };
}

const revalidarToken = async (tokenObtenido) => {

    // AGREGAR SERVICIO
    const { uid, nombre } = jwt.verify(
      tokenObtenido,
      process.env.SECRET_JWT_SEED
    );

    const token = await generarJWT(uid, nombre);
    
    return {
         uid,
        nombre,
        token
    };
}

const loginUsuario = async (sEmail,sPassword) => {

    const usuario = await prisma.bUENAS_PRACTICAS_01_USUARIO.findFirst({
        where: {
          sEmail: sEmail,
        },
      });
  
      if (!usuario) {
        throw new Error("El usuario no existe con ese email");
      }
      // Confirmar los passwords
      const validPassword = bcrypt.compareSync(sPassword, usuario.sPassword);

      if (!validPassword) {
        throw new Error("Password Incorrecto");
      }
      
      const token = await generarJWT(usuario.nId01Usuario, usuario.sName);

    return {
         uid: usuario.nId01Usuario,
        token
    };
}
module.exports = {
    getAllUsuarios,
    newUsuario,
    revalidarToken,
    loginUsuario
}