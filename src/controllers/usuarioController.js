const usuarioService = require("../services/usuarioService")

const getAllUsuarios = async (req,res) => {

    const allUsuarios = await usuarioService.getAllUsuarios()

    res.send({
        status: 'Ok',
        data: allUsuarios
    })
}

module.exports = {
    getAllUsuarios,
}