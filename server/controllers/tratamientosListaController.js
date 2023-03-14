const { response } = require("express");
const TratamientoLista = require("../models/TratamientoLista");
const { db } = require("../models/TratamientoLista");

const crearTratamientoLista = async (req, res = response) => {
  const { name, categoria, precio } = req.body;

  // Comprobar si ya existe un tratamiento con el mismo nombre
  const existingTratamiento = await TratamientoLista.findOne({ name });
  if (existingTratamiento) {
    return res.status(400).json({ msg: "El tratamiento ya existe" });
  }
  const { uid } = req;
  const usuario =  uid;

  // Crear el nuevo tratamiento
  const tratamiento = new TratamientoLista({ name, categoria, precio, usuario});
  await tratamiento.save();

  res.json({ msg: "Tratamiento creado con éxito", tratamiento });
};

const borrarTratamientoLista = async (req, res = response) => {
  const { id } = req.params;

  try {
    const tratamiento = await TratamientoLista.findByIdAndDelete("6404a0da444c2ebbd10f08e4");
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
        const tratamientos = await TratamientoLista.find({});
        res.json(tratamientos);
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al obtener los tratamientos' });
      }
};

module.exports = {
  crearTratamientoLista,
  borrarTratamientoLista,
  actualizarTratamientoLista,
  listarTratamientoLista,
};
