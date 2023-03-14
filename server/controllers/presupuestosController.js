const { response } = require("express");
const Presupuesto = require("../models/Presupuesto");
const { db } = require("../models/Presupuesto");

const crearPresupuesto = async (req, res = response) => {
    try {
      const { name, descripcion, precio, fecha, categoria } = req.body;
  
      // Validate required fields
      if (!name || !descripcion || !fecha || !categoria) {
        return res.status(400).json({
          ok: false,
          msg: "Nombre, descripcion, fecha y categoria son campos requeridos",
        });
      }
  
      // Create a new instance of Presupuesto model
      const nuevoPresupuesto = new Presupuesto({
        name,
        descripcion,
        precio,
        fecha,
        categoria,
      });
  
      // Save the new budget to the database
      await nuevoPresupuesto.save();
  
      res.status(201).json({
        ok: true,
        msg:"Presupuesto creado exitosamente",
        presupuesto: nuevoPresupuesto,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al crear presupuesto",
      });
    }
  };
  
  const borrarPresupuesto = async (req, res = response) => {
    const { id } = req.params;
  
    try {
      const presupuesto = await Presupuesto.findByIdAndDelete(id);
  
      if (!presupuesto) {
        return res.status(404).json({
          ok: false,
          msg: 'Presupuesto no encontrado',
        });
      }
  
      res.json({
        ok: true,
        msg: 'Presupuesto eliminado correctamente',
        presupuesto,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al intentar eliminar el presupuesto',
      });
    }
  };
  
  const actualizarPresupuesto = async (req, res = response) => {
    const { id } = req.params;
    const { name, descripcion, precio, fecha, categoria } = req.body;
  
    try {
      const presupuesto = await Presupuesto.findByIdAndUpdate(
        id,
        {
          name,
          descripcion,
          precio,
          fecha,
          categoria,
        },
        { new: true }
      );
  
      res.json({
        ok: true,
        presupuesto,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el presupuesto",
      });
    }
  };
  
  const verPresupuesto = async (req, res = response) => {
    const { id } = req.params;
    try {
      const presupuesto = await Presupuesto.findById(id);
      if (!presupuesto) {
        return res.status(404).json({ msg: 'Presupuesto no encontrado' });
      }
      res.json(presupuesto);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el servidor');
    }
  };
  
  
  const listarPresupuestoConId = async (req, res = response) => {
    const id = req.params.id;
  try {
    const presupuesto = await Presupuesto.findById(id);
    if (!presupuesto) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un presupuesto con ese ID",
      });
    }
    res.json({
      ok: true,
      msg: "Presupuesto encontrado",
      presupuesto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el presupuesto",
    });
  }
  };

  const listarPresupuestoSinId = async (req, res = response) => {
    try {
        const presupuestos = await Presupuesto.find();
        res.json({
          ok: true,
          presupuestos
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Error al obtener los presupuestos'
        });
      }
  };
  
  
  module.exports = {
    crearPresupuesto,
    borrarPresupuesto,
    actualizarPresupuesto,
    listarPresupuestoSinId,
    listarPresupuestoConId,
    verPresupuesto
  };
  