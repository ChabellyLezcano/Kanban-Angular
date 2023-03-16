const { response } = require("express");
const TratamientoLista = require("../models/TratamientoLista");
const { db } = require("../models/TratamientoLista");

const crearTratamientoLista = async (req, res = response) => {
  try {
    const { name, categoria, precio } = req.body;

    const { uid } = req;
  const usuario =  uid;

    // create a new instance of a Doctor
    const tratamientoLista = new TratamientoLista({
      name, categoria, precio, usuario
    });

    const tratamientoExistente = await TratamientoLista.findOne({ name });

  if ( tratamientoExistente ) {
      return res.status(400).json({
          ok: false,
          msg: 'El tratamiento ya existe'
      });
  } 

    // save the Doctor to the database
    await tratamientoLista.save();

    // send the Doctor object as a response
    res.status(201).json({
      ok: true,
      msg: "Tratamiento creado exitosamente",
      tratamientoLista
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al crear tratamiento",
    });
  }
};

const borrarTratamientoLista = async (req, res = response) => {
  const { id } = req.params;

  try {
    const tratamiento = await TratamientoLista.findByIdAndDelete({id});
    if (!tratamiento) {
      return res.status(404).json({
        ok: false,
        msg: "Tratamiento no encontrado",
      });
    }
    res.json({
      ok: true,
      msg: "Tratamiento eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar tratamiento",
    });
  }
};

const actualizarTratamientoLista = async (req, res = response) => {
    const { id } = req.params;
  const { name, categoria, precio } = req.body;

  try {
    const tratamiento = await TratamientoLista.findById(id);
    if (!tratamiento) {
      return res.status(404).json({
        ok: false,
        msg: 'Tratamiento no encontrado',
      });
    }

    // Update tratamiento
    const newTratamiento = {
      name,
      categoria,
      precio,
    };
    const updatedTratamiento = await TratamientoLista.findByIdAndUpdate(
      id,
      newTratamiento,
      { new: true }
    );

    res.json({
      ok: true,
      tratamiento: updatedTratamiento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor, hable con el administrador',
    });
  }
};


const listarTratamientoLista = async (req, res = response) => {
  try {
    const { uid } = req;
    console.log(uid)
    const tratamientos = await TratamientoLista.find({ usuario: uid });
    res.json({
      ok: true,
      tratamientos
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener tratamientos",
    });
  }
};

module.exports = {
  crearTratamientoLista,
  borrarTratamientoLista,
  actualizarTratamientoLista,
  listarTratamientoLista,
};
