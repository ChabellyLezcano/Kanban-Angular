const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

const envioCorreoDoctor = require('../controllers/correoController');

//router.post('/send-email', enviarCorreoDoctor);

module.exports = router;
