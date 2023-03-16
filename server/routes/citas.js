const { Router } = require("express");
const { check } = require("express-validator");
const { crearCita, borrarCita, actualizarCita, verCita, listarCitas } = require("../controllers/citaController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear cita
router.post(
  "/addCita",
  [
    check("titulo", "El campo del titulo está vacío").notEmpty(),
    check("descripcion", "El campo de la descripcion está vacío").notEmpty(),
    check("paciente", "El campo del email está vacío").notEmpty(),
    check("doctor", "El campo del doctor de Colegiado está vacío").notEmpty(),
    check("fecha", "El campo del teléfono está vacío").notEmpty(),
    check("hora", "El campo de la especialidad está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  crearCita
);

// Borrar cita
router.delete("/deleteCita/:id", validarJWT, borrarCita);

// Actualizar cita
router.put(
  "/actualizarCita/:id",
  [
    check("titulo", "El campo del titulo está vacío").notEmpty(),
    check("descripcion", "El campo de la descripcion está vacío").notEmpty(),
    check("paciente", "El campo del email está vacío").notEmpty(),
    check("doctor", "El campo del doctor de Colegiado está vacío").notEmpty(),
    check("fecha", "El campo del teléfono está vacío").notEmpty(),
    check("hora", "El campo de la especialidad está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  actualizarCita
);

// Ver cita
router.get("/verCita/:id", verCita);

// Listar citaes 
router.get("/listarDoctor", validarJWT, listarCitas);

module.exports = router;
