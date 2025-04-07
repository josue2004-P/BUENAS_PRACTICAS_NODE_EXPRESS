const express = require("express");
const v1UsuarioRouter = require("./v1/routes/usuarioRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use("/api/v1/usuarios",v1UsuarioRouter);


app.listen(PORT, ()=>{ console.log(`Servidor corriendo en el puesto ${PORT}`)});


