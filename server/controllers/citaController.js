const { response } = require('express');
const Cita  = require ('../models/Cita');
const Paciente  = require ('../models/Paciente')


const crearCita = async (req, res = response) => {
    const { titulo, descripcion, hora, fecha, uid } = req.body;
  
    try {
      const pacientes = await Paciente.find({ uid });
      const doctores = await Doctor.find({ uid });
  
      const cita = new Cita({
        titulo,
        descripcion,
        hora,
        fecha,
        usuario: req.usuario._id,
        doctor: doctores[0]._id,
        paciente: pacientes[0]._id,
      });
  
      await cita.save();
  
      res.json({
        ok: true,
        cita,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor, hable con el administrador",
      });
    }
  };

const borrarCita = async(req, res = response) => {

   

}

const actualizarCita = async(req, res = response) => {

   

}

const listarCitas = async(req, res = response ) => {

}

const verCita = async(req, res = response ) => {

}

module.exports = {
    crearCita,
    actualizarCita,
    borrarCita, 
    listarCitas,
    verCita
}
