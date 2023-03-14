const { Router } = require("express");
const { check } = require("express-validator");
const { crearEvento, actualizarEvento, borrarEvento, verEvento, listarEventos } = require("../controllers/eventosController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear perfil
router.post(
  "/addEvento",
  [
    check("titulo", "El campo del título está vacío").notEmpty(),
    check("descripcion", "El campo de la descripción está vacío").notEmpty(),
    check("fecha", "El campo de la fecha está vacío").notEmpty(),
    check("hora", "El campo de la hora está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  crearEvento
);

// Borrar perfil
router.delete("/deleteEvento/:id", borrarEvento);

// Actualizar perfil
router.put(
  "/actualizarEvento/:id",
  [
    check("titulo", "El campo del título está vacío").notEmpty(),
    check("descripcion", "El campo de la descripción está vacío").notEmpty(),
    check("fecha", "El campo de la fecha está vacío").notEmpty(),
    check("hora", "El campo de la hora está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  actualizarEvento
);

// Ver perfil
router.get("/verEvento/:id", verEvento);

// Listar perfiles de doctores
router.get("/listarEvento", validarJWT, listarEventos);

module.exports = router;
