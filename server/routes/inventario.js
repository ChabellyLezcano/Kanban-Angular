const { Router } = require("express");
const { check } = require("express-validator");
const { crearProducto, borrarProducto, actualizarProducto, verProducto, listarProductos } = require("../controllers/inventarioController");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear perfil codigoProducto,
router.post(
  "/addProducto",
  [
    check("name", "El campo del nombre está vacío").notEmpty(),
    check("categoria", "El campo de la categoría está vacío").notEmpty(),
    check("marca", "El campo de la marca está vacío").notEmpty(),
    check("descripcion", "El campo de la descripción está vacío").notEmpty(),
    check("precio", "El campo del precio está vacío").notEmpty(),
    check("unidades", "El campo de las unidades está vacío").notEmpty(),
    check("fecha", "El campo de la fecha está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  crearProducto
);

// Borrar perfil
router.delete("/deleteProducto/:id", borrarProducto);

// Actualizar perfil
router.put(
  "/actualizarProducto/:id",
  [
    check("name", "El campo del nombre está vacío").notEmpty(),
    check("categoria", "El campo de la categoría está vacío").notEmpty(),
    check("marca", "El campo de la marca está vacío").notEmpty(),
    check("descripcion", "El campo de la descripción está vacío").notEmpty(),
    check("precio", "El campo del precio está vacío").notEmpty(),
    check("unidades", "El campo de las unidades está vacío").notEmpty(),
    check("fecha", "El campo de la fecha está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  actualizarProducto
);

// Ver perfil
router.get("/verProducto/:id", verProducto);

// Listar perfiles de doctores
router.get("/listarProductos", validarJWT, listarProductos);

module.exports = router;
