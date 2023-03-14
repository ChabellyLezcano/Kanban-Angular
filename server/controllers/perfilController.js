const { response } = require("express");
const Perfil = require("../models/Perfil");
const path = require("path");
const fs = require("fs");
const { db } = require("../models/Perfil");
const Usuario = require("../models/Usuario");

const crearPerfil = async (req, res = response) => {
  try {
    const {
      foto,
      direccion,
      cp,
      nif,
      telefono_movil,
      telefono_fijo,
      municipio,
      provincia,
      
    } = req.body;
  

    const { uid } = req;


    const usuario =  uid;

    console.log(usuario)
    // Obtener la foto subida por el usuario
    /*const foto = req.file;
    
        // Check if a file was uploaded
        if (!foto) {
            return res.status(400).json({
                ok: false,
                msg: 'No se ha enviado ninguna foto'
            });
        }*/

    // Crear una instancia del modelo Perfil
    const perfil = new Perfil({
      foto,
      direccion,
      cp,
      nif,
      telefono_movil,
      telefono_fijo,
      municipio,
      provincia,
      usuario
    });

    const perfilExistente = await Perfil.findOne({ usuario });

if (perfilExistente) {
  return res.status(400).json({
    ok: false,
    msg: "Ya existe un perfil para este usuario",
  });
} 
const nifExistente = await Perfil.findOne({ nif });

if (nifExistente) {
  return res.status(400).json({
    ok: false,
    msg: "Ya existe un perfil con este nif",
  });
}

    // Guardar el perfil en MongoDB
    await perfil.save();

    // Mover la foto a la carpeta pública del proyecto
    //fs.renameSync(path.join(__dirname, '..', 'files', foto.filename), path.join(__dirname, '..', 'public', 'uploads', foto.filename));

    // Devolver la respuesta al cliente
    res.json({
      ok: true,
      msg: "Perfil creado correctamente",
      perfil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al guardar el perfil en la base de datos",
    });
    // Obtener la foto subida por el usuario
    /*const foto = req.file;
    
        // Check if a file was uploaded
        if (!foto) {
            return res.status(400).json({
                ok: false,
                msg: 'No se ha enviado ninguna foto'
            });
        }*/
  }
};

const borrarPerfil = async (req, res = response) => {
  const perfilId = req.params.id; // obtener el id del perfil a borrar desde la URL
  try {
    // buscar y borrar el perfil en la base de datos
    const perfil = await Perfil.findByIdAndDelete(perfilId);

    // verificar si se encontró el perfil
    if (!perfil) {
      return res.status(404).json({
        ok: false,
        msg: "Perfil no encontrado",
      });
    }

    // devolver una respuesta exitosa
    res.json({
      ok: true,
      msg: "Perfil borrado correctamente",
      perfil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al borrar el perfil",
    });
  }
};

const actualizarPerfil = async (req, res = response) => {
  const perfilId = req.params.id; // obtener el id del perfil a actualizar desde la URL
  const datosPerfil = req.body; // obtener los datos del perfil a actualizar desde el cuerpo de la petición

  try {
    // buscar y actualizar el perfil en la base de datos
    const perfilActualizado = await Perfil.findByIdAndUpdate(
      perfilId,
      datosPerfil,
      { new: true }
    );

    // verificar si se encontró el perfil
    if (!perfilActualizado) {
      return res.status(404).json({
        ok: false,
        msg: "Perfil no encontrado",
      });
    }

    // devolver una respuesta exitosa
    res.json({
      ok: true,
      msg: "Perfil actualizado correctamente",
      perfil: perfilActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el perfil",
    });
  }
};

const verPefil = async (req, res = response) => {
  const perfilId = req.params.id; // obtener el id del perfil a buscar desde la URL

  try {
    // buscar el perfil en la base de datos
    const perfil = await Perfil.findById(perfilId);

    // verificar si se encontró el perfil
    if (!perfil) {
      return res.status(404).json({
        ok: false,
        msg: "Perfil no encontrado",
      });
    }

    // devolver una respuesta exitosa con el perfil encontrado
    res.json({
      ok: true,
      perfil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al buscar el perfil",
    });
  }
};

module.exports = {
  crearPerfil,
  borrarPerfil,
  actualizarPerfil,
  verPefil,
};
