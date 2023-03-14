const { Router } = require("express");
const { check } = require("express-validator");
const { crearPerfil, borrarPerfil, actualizarPerfil, verPefil } = require("../controllers/perfilController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Crear perfil
router.post(
  "/addPerfil",
  [
    check("direccion", "El campo de la direccion está vacío").notEmpty(),
    check("nif", "El campo del nif está vacío").notEmpty(),
    check("municipio", "El campo del municipioestá vacío").notEmpty(),
    check("provincia", "El campo de la provincia está vacío").notEmpty(),
    check("cp", "El campo del cp está vacío").notEmpty(),
    check("telefono_movil", "El campo del teléfono está vacío").notEmpty(),
    check("telefono_fijo", "El campo del teléfono fijo está vacío").notEmpty(),
    check("cp", "El campo del cp está vacío").notEmpty(),
    validarCampos,
    validarJWT
  ],
  crearPerfil
);

// Borrar perfil
router.delete("/deletePerfil/:id", borrarPerfil);

// Actualizar perfil
router.put(
  "/actualizarPefil/:id",
  [
    check("direccion", "El campo de la direccion está vacío").notEmpty(),
    check("nif", "El campo del nif está vacío").notEmpty(),
    check("municipio", "El campo del municipioestá vacío").notEmpty(),
    check("provincia", "El campo de la provincia está vacío").notEmpty(),
    check("cp", "El campo del cp está vacío").notEmpty(),
    check("telefono_movil", "El campo del teléfono está vacío").notEmpty(),
    check("telefono_fijo", "El campo del teléfono fijo está vacío").notEmpty(),
    check("cp", "El campo del cp está vacío").notEmpty(),
    validarCampos,
  ],
  actualizarPerfil
);

// Ver perfil
router.get("/verPerfil/:id", verPefil);

module.exports = router;
