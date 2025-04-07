const express = require("express");
const router = express.Router();
const usuarioController = require("../../controllers/usuarioController");
const { validarJWT } = require("../../middlewares/validar-jwt");

router
	.get("/", usuarioController.getAllUsuarios)
	.post("/new",usuarioController.crearUsuario)
	.get("/renew",validarJWT, usuarioController.revalidarToken)

module.exports = router;
