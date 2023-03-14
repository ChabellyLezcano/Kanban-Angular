const { response } = require("express");
const Producto = require("../models/Producto");
const { db } = require("../models/Producto");

const crearProducto = async (req, res = response) => {
  try {
    const {
      codigoProducto,
      name,
      categoria,
      marca,
      descripcion,
      precio,
      unidades,
      fecha
    } = req.body;

    const { uid } = req;
    const usuario = uid;


    // create a new instance of a Producto
    const producto = new Producto({
        codigoProducto,
        name,
        categoria,
        marca,
        descripcion,
        precio,
        unidades,
        fecha,
      usuario,
    });

    const productoExistente= await Producto.findOne({ codigoProducto, fecha });

    if ( productoExistente ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya has añadido este mismo producto en esta fecha'
        });
    } 

    // save the Doctor to the database
    await producto.save();

    // send the Doctor object as a response
    res.status(201).json({
      //ok: true,
      //msg: "Producto añadido exitosamente",
      producto
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al añadir producto",
    });
  }
};

const borrarProducto = async (req, res = response) => {
  try {
    const idProducto = req.params.id;

    // find the Doctor by numColegiado and remove it from the database
    const producto = await Producto.deleteOne({ _id: idProducto });

    if (!producto) {
      return res.status(404).json({
        msg: "Producto no encontrado",
      });
    }

    // send a success message as a response
    res.json({
      msg: "Producto eliminado correctamente de la lista",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar producto",
    });
  }
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const {
    codigoProducto,
    name,
    categoria,
    marca,
    descripcion,
    precio,
    unidades,
    fecha
  } = req.body;

  try {
    const producto = await Producto.findOneAndUpdate(
      { _id: id },
      {
        codigoProducto,
      name,
      categoria,
      marca,
      descripcion,
      precio,
      unidades,
      fecha
      },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
      });
    }

    res.json({
      ok: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

const verProducto= async (req, res = response) => {
  const id = req.params.id;

  try {
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
      });
    }

    res.json({
      ok: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};

const listarProductos = async (req, res = response) => {
  const { uid } = req;
    const usuario = uid;
  try {
    const producto = await Producto.find({usuario});
    res.status(200).json({
      //ok: true,
     producto
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al listar los productos",
    });
  }
};

module.exports = {
  crearProducto,
  actualizarProducto,
  borrarProducto,
  verProducto,
  listarProductos
};
