const { response } = require("express");
const Tarea = require ('../models/Tarea')


const crearTarea = async (req, res = response) => {

    const { titulo, descripcion, estado, prioridad } = req.body;
    const { uid } = req;
    const user =  uid;

    try {
        const tarea = new Tarea({ titulo, descripcion, estado, prioridad, usuario : user });
        await tarea.save();
    
        res.json({
          ok: true,
          tarea
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Error al crear la tarea'
        });
      }
};

const borrarTarea = async (req, res = response) => {
    const tareaId = req.params.id;
  
    try {
      const tarea = await Tarea.findById(tareaId);
  
      if (!tarea) {
        return res.status(404).json({
          ok: false,
          msg: 'La tarea no existe',
        });
      }
  
      await Tarea.findByIdAndDelete(tareaId);
  
      res.json({
        ok: true,
        msg: 'Tarea eliminada correctamente',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar la tarea',
      });
    }
  };
  

  
  const editarTarea = async (req, res = response) => {
    const tareaId = req.params.id;
    const { titulo, descripcion, estado, prioridad } = req.body;
  
    try {
      const tarea = await Tarea.findById(tareaId);
  
      if (!tarea) {
        return res.status(404).json({
          ok: false,
          msg: 'La tarea no existe',
        });
      }
  
      tarea.titulo = titulo;
      tarea.descripcion = descripcion;
      tarea.estado = estado;
      tarea.prioridad = prioridad;
  
      await tarea.save();
  
      res.json({
        ok: true,
        tarea,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al actualizar la tarea',
      });
    }
  };
  

  const listarTareas = async (req, res = response) => {
    const { uid } = req;
    try {
      const tareas = await Tarea.find({ usuario: uid });
      res.json({
        ok: true,
        tareas
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al obtener las tareas del usuario'
      });
    }
  };

module.exports = {
  crearTarea,
  editarTarea,
  borrarTarea,
  listarTareas
};
