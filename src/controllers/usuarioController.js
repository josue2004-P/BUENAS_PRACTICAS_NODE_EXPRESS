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

    // AGREGAR SERVICIO
    const { uid, nombre } = jwt.verify(
      tokenObtenido,
      process.env.SECRET_JWT_SEED
    );
  
    // Generar JWT
    const token = await generarJWT(uid, nombre);
  
    res.json({
      ok: true,
      id: uid,
      token,
    });
  };
  

module.exports = {
    getAllUsuarios,
    crearUsuario,
    revalidarToken
}