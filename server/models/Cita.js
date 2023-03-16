const { time } = require("console");
const { Schema, model } = require("mongoose");

const CitaSchema = Schema({
    titulo: {
      type: String,
      require: false,
    },
    descripcion: {
      type: String,
      required: true,
    },
    hora: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: true,
    },
  });

module.exports = model("Cita", CitaSchema);
