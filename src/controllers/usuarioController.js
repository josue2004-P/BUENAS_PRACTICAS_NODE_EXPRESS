const usuarioService = require("../services/usuarioService")
const jwt = require("jsonwebtoken");

const getAllUsuarios = async (req,res) => {

    const allUsuarios = await usuarioService.getAllUsuarios()

    res.send({
        status: 'Ok',
        data: allUsuarios
    })
}

const crearUsuario = async (req,res) => {

    const {sEmail,sPassword,sName} = req.body;

    try {

        const { user, token } = await usuarioService.newUsuario(sName,sEmail, sPassword, );
        
        res.status(201).send({
            status: "Ok",
            message: "Usuario creado exitosamente",
            data: {
                user: user.sName,
                token: token,
            },
        });
    } catch (error) {
        // Si el error es por correo ya registrado
        if (error.message === "El correo electrónico ya está registrado.") {
            res.status(400).send({
                status: "Error",
                message: error.message,
            });
        } else {
            // Manejo de otros tipos de errores
            res.status(500).send({
                status: "Error",
                message: "Error inesperado al crear el usuario",
                message: error.message,

            });
        }
    }
}

const revalidarToken = async (req, res = response) => {

    const tokenObtenido = req.header("x-token");

    const { uid,token } = await usuarioService.revalidarToken(tokenObtenido);

    res.json({
      ok: true,
      id: uid,
      token,
    });
};
  
  // LOGIN
const loginUsuario = async (req, res = response) => {

    const { sEmail, sPassword } = req.body;
  
    try {

    const { uid,token } = await usuarioService.loginUsuario(sEmail,sPassword);

      res.json({
        ok: true,
        id: uid,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  };


module.exports = {
    getAllUsuarios,
    crearUsuario,
    revalidarToken,
    loginUsuario
}