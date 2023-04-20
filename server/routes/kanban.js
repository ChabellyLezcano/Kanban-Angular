const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { crearTarea, borrarTarea, editarTarea, listarTareas } = require('../controllers/kanbanController');

const router = Router();

router.post(
  '/crearTarea',
  [
    validarJWT,
    check('titulo', 'El título es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatoria').notEmpty(),
    check('estado', 'El estado no es válido').isIn(['To Do', 'Doing', 'Done']),
    check('prioridad', 'La prioridad no es válida').isIn(['Baja', 'Media', 'Alta']),
    validarCampos,
  ],
  crearTarea
);

router.delete('/borrarTarea/:id',
[
  validarJWT
], borrarTarea);

router.put('/editarTarea/:id',
  [
    validarJWT,
    check('titulo', 'El título es obligatorio').notEmpty(),
    check('descripcion', 'La descripción es obligatoria').notEmpty(),
    check('estado', 'El estado no es válido').isIn(['To Do', 'Doing', 'Done']),
    check('prioridad', 'La prioridad no es válida').isIn(['Baja', 'Media', 'Alta']),
    validarCampos,
  ],
  editarTarea
);

router.get('/listarTareas', validarJWT, listarTareas);

module.exports = router;