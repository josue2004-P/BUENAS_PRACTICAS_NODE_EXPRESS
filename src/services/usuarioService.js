const Usuario = require("../database/Usuario")

const getAllUsuarios = async () =>{

    const usuarios = await Usuario.getAllUsuarios();
    return usuarios;
}

module.exports = {
    getAllUsuarios,
}