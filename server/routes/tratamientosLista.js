const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearTratamientoLista,
  borrarTratamientoLista,
  actualizarTratamientoLista,
  verTratamientoLista,
  listarTratamientoLista,
} = require("../controllers/tratamientosListaController");
const { validarCampos } = require("../middlewares/validar-campos");
const {validarJWT} = require('../middlewares/validar-jwt')

const router = Router();

//Crear tratamiento
router.post(
  "/addTratamientoLista",
  [
    check("name", "El campo del nombre está vacío").notEmpty(),
    check("categoria", "El campo de la categoría está vacío").notEmpty(),
    check("precio", "El campo del precio está vacío").notEmpty(),
    check("precio", "El campo del precio debe ser un número").isNumeric(),
    validarCampos,
    validarJWT
  ],
  crearTratamientoLista
);

// Borrar tartamiento
router.delete("/deleteTratamientoLista/:id", borrarTratamientoLista);

// Actualizar tratamiento
router.put(
  "/actualizarTratamientoLista/:id",
  [
    check("name", "El campo del nombre está vacío").notEmpty(),
    check("categoria", "El campo de la categoría está vacío").notEmpty(),
    check("precio", "El campo del precio está vacío").notEmpty(),
    check("precio", "El campo del precio debe ser un número").isNumeric(),
    validarCampos,
  ],
  actualizarTratamientoLista
);

// Ver tratamiento

router.get("/listarTratamientoLista", listarTratamientoLista);

module.exports = router;
