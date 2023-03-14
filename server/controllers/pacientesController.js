const { response } = require("express");
const Paciente = require("../models/Paciente");
const { db } = require("../models/Paciente");

const crearPaciente = async (req, res = response) => {
  try {
    const { name, apellidos, email, dni, direccion, telefono_movil, cp, municipio, provincia } = req.body;

    const { uid } = req;
    const usuario =  uid;

    // Create a new instance of the Patient model
    const paciente = new Paciente({
        name, apellidos, email, dni, direccion, telefono_movil, cp, municipio, provincia, usuario
    });

    const pacienteExistente = await Paciente.findOne({ email });

    if ( pacienteExistente ) {
        return res.status(400).json({
            ok: false,
            msg: 'El paciente ya existe con ese email'
        });
    } 

    // Save the new patient to the database
    await paciente.save();

    // Send a response indicating success
    res.status(201).json({
      ok: true,
      msg: "Paciente creado exitosamente",
      paciente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear paciente",
    });
  }
};

const borrarPaciente = async (req, res = response) => {
    const pacienteId = req.params.id;
  
    try {
      // Find and delete the patient with the given ID
      const pacienteEliminado = await Paciente.deleteOne({ _id: pacienteId });
  
      if (pacienteEliminado.deletedCount === 0) {
        // Patient with given ID not found
        return res.status(404).json({
          ok: false,
          msg: 'Paciente no encontrado'
        });
      }
  
      res.json({
        ok: true,
        msg: 'Paciente eliminado correctamente'
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar el paciente'
      });
    }
  }

  const actualizarPaciente = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { name, apellidos, email, dni, direccion, telefono_movil, cp, municipio, provincia } = req.body;
  
      const pacienteActualizado = await Paciente.findByIdAndUpdate(
        id,
        { name, apellidos, email, dni, direccion, telefono_movil, cp, municipio, provincia },
        { new: true }
      );
  
      if (!pacienteActualizado) {
        return res.status(404).json({
          ok: false,
          msg: 'Paciente no encontrado'
        });
      }
  
      res.json({
        ok: true,
        msg: 'Paciente actualizado correctamente',
        paciente: pacienteActualizado
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al actualizar el paciente'
      });
    }
  };


const verPaciente = async (req, res = response) => {
    try {
        const pacienteId = req.query.id; // obtener el ID del paciente desde la consulta
        const paciente = await Paciente.findById(pacienteId); // buscar el paciente en la base de datos
        if (!paciente) {
          res.status(404).json({ message: 'Paciente no encontrado' }); // devolver un error 404 si no se encuentra el paciente
        } else {
          res.json(paciente); // devolver el paciente encontrado como respuesta HTTP
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar el paciente' }); // devolver un error 500 en caso de una excepción
      }
};


const listarPaciente = async (req, res = response) => {

  const { uid } = req;
    const usuario =  uid;
    try {
        const pacientes = await Paciente.find({usuario});
        res.json({ pacientes });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Error del servidor");
      }
}

module.exports = {
  crearPaciente,
  borrarPaciente,
  actualizarPaciente,
  verPaciente,
  listarPaciente
};
