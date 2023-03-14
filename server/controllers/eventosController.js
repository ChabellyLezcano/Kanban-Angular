const { response } = require("express");
const Evento = require("../models/Evento");
const { db } = require("../models/Evento");

const crearEvento = async (req, res = response) => {
    try {
      const { titulo, descripcion, hora, fecha } = req.body;
  
      const { uid } = req;
    const usuario =  uid;


      // create a new instance of a evento
      const evento = new Evento({
        titulo, descripcion, hora, fecha, usuario
      });

  
    const eventoCoincidente = await Evento.findOne({ hora, fecha });

    if ( eventoCoincidente ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya tiene un evento a esa hora'
        });
    } 
  
      // save the evento to the database
      await evento.save();
  
      // send the Doctor object as a response
      res.status(201).json({
        ok: true,
        msg: "Evento creado exitosamente",
        evento
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al crear evento",
      });
    }
  };
  
  
  const borrarEvento = async (req, res = response) => {
    try {
      const idEvento = req.params.id;
  
      // find the evento by numColegiado and remove it from the database
      const evento = await Evento.deleteOne({ _id: idEvento });
  
      if (!evento) {
        return res.status(404).json({
          msg: "Evento no encontrado",
        });
      }
  
      // send a success message as a response
      res.json({
        msg: "Evento eliminado correctamente",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al eliminar evento",
      });
    }
  };
  
  const actualizarEvento = async (req, res = response) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha, hora } = req.body;
  
    try {
      const evento = await Evento.findOneAndUpdate(
        { _id: id },
        {titulo, descripcion, fecha, hora },
        { new: true }
      );
  
      if (!evento) {
        return res.status(404).json({
          ok: false,
          msg: 'Evento no encontrado'
        });
      }
  
      res.json({
        ok: true,
        evento
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Server error'
      });
    }
  };
  
  
  const verEvento = async (req, res = response) => {
    const id = req.params.id;
  
    try {
      const evento = await Evento.findById(id);
  
      if (!evento) {
        return res.status(404).json({
          ok: false,
          msg: "Evento no encontrado",
        });
      }
  
      res.json({
        ok: true,
        evento,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Unexpected error while getting doctor details",
      });
    }
  };
  
  
  const listarEventos= async (req, res = response) => {
    const { uid } = req;
    const usuario =  uid;
    try {
      const evento = await Evento.find({usuario});
      res.status(200).json({
        ok: true,
        evento
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al listar los eventos'
      });
    }
  };
  
  module.exports = {
    crearEvento,
    borrarEvento, actualizarEvento, listarEventos, verEvento
  };
  