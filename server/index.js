const express = require("express");
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const { dbConnection } = require("./database/config");

require("dotenv").config();

// Crear aplicación de express
const app = express();

// Base de datos
dbConnection();

//Directorio publico
const publicDirectoryPath = path.join(__dirname, '../public');

// CORS
app.use(
  cors({
    exposedHeaders: ["x-token"],
  })
);

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/kanban", require("./routes/kanban"));


//Inicio del servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});