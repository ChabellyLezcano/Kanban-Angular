const { Router } = require("express");
const { check } = require("express-validator");
const { borrarDoctor, crearDoctor, actualizarDoctor, verDoctor, listarDoctores } = require("../controllers/doctoresController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear perfil
router.post(
  "/addDoctor",
  [
    check("name", "El campo del nombre está vacío").notEmpty(),
    check("apellidos", "El campo de los apellidos está vacío").notEmpty(),
    check("email", "El campo del email está vacío").notEmpty(),
    check("numColegiado", "El campo del número de Colegiado está vacío").notEmpty(),
    check("telefono_movil", "El campo del teléfono está vacío").notEmpty(),
    check("especialidad", "El campo de la especialidad está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  crearDoctor
);

// Borrar perfil
router.delete("/deleteDoctor/:id", borrarDoctor);

// Actualizar perfil
router.put(
  "/actualizarDoctor/:id",
  [
    check("name", "El campo del nombre está vacío").notEmpty(),
    check("apellidos", "El campo de los apellidos está vacío").notEmpty(),
    check("email", "El campo del email está vacío").notEmpty(),
    check("numColegiado", "El campo del número de Colegiado está vacío").notEmpty(),
    check("telefono_movil", "El campo del teléfono está vacío").notEmpty(),
    check("especialidad", "El campo de la especialidad está vacío").notEmpty(),
    validarCampos,
  ],
  actualizarDoctor
);

// Ver perfil
router.get("/verDoctor/:id", verDoctor);

// Listar perfiles de doctores
router.get("/listarDoctor", validarJWT, listarDoctores);

module.exports = router;
