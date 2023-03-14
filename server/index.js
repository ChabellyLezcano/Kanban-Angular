const express = require("express");
const cors = require("cors");
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const fileFilter = require('./middlewares/file-filter');
const { v4: uuidv4 } = require('uuid');
const { dbConnection } = require("./db/config");


require("dotenv").config();

// Crear aplicación de express
const app = express();


// Base de datos
dbConnection();

// Directorio Público
app.use(express.static("public"));

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

//Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'files'),
  filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname));
  }
});
app.use(multer({
  dest: path.join(__dirname, 'files'),
  fileFilter,
  limits: { fileSize: 1000000 },
  storage
}).single('image'));

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/paciente", require("./routes/pacientes"));
app.use("/api/tratamientoLista", require("./routes/tratamientosLista"));
app.use("/api/perfil", require("./routes/perfil"));
app.use("/api/doctor", require("./routes/doctores"));
app.use("/api/presupuestos", require("./routes/presupuestos"));
app.use("/api/eventos", require("./routes/eventos"));
app.use("/api/inventario", require("./routes/inventario"));

//Inicio del servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});


