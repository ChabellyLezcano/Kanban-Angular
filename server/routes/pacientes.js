const { Router } = require("express");
const { check } = require("express-validator");
const { crearPaciente, borrarPaciente, actualizarPaciente, verPaciente, listarPaciente } = require("../controllers/pacientesController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
    "/addPaciente",
    [
      check("name", "El campo del nombre está vacío").notEmpty(),
      check("email", "El campo del email está vacío").notEmpty(),
      check("email", "El formato del email es incorrecto").isEmail(),
      check("apellidos", "El campo de los apellidos está vacío").notEmpty(),
      check("direccion", "El campo de la dirección está vacío").notEmpty(),
      check("municipio", "El campo del municipio está vacío").notEmpty(),
      check("provincia", "El campo de la provincia está vacío").notEmpty(),
      check("telefono_movil", "El campo del telefono está vacío").notEmpty(),
      check("cp", "El campo del nombre está vacío").notEmpty(),
      check("dni", "El campo del dni está vacío").notEmpty(),
      validarCampos,
      validarJWT
    ],
    crearPaciente
  );
  
  // Borrar paciente
  router.delete(
    "/deletePaciente/:id",validarJWT,
    borrarPaciente
  );
  
// Actualizar Paciente
router.put(
    "/actualizarPaciente/:id",
    [
      check("name", "El campo del nombre está vacío").notEmpty(),
      check("email", "El campo del email está vacío").notEmpty(),
      check("email", "El formato del email es incorrecto").isEmail(),
      check("apellidos", "El campo de los apellidos está vacío").notEmpty(),
      check("direccion", "El campo de la dirección está vacío").notEmpty(),
      check("municipio", "El campo del municipio está vacío").notEmpty(),
      check("provincia", "El campo de la provincia está vacío").notEmpty(),
      check("telefono_movil", "El campo del telefono está vacío").notEmpty(),
      check("cp", "El campo del nombre está vacío").notEmpty(),
      check("dni", "El campo del dni está vacío").notEmpty(),
        validarCampos,
        validarJWT
      ],
    actualizarPaciente
  );
  
 // Ver paciente
 router.get(
    "/verPaciente/:id",validarJWT,
    verPaciente
  );

  router.get(
    "/listarPaciente", validarJWT,
    listarPaciente
  );


module.exports = router;
