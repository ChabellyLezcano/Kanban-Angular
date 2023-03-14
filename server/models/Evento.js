const { time } = require("console");
const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
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
});

module.exports = model("Evento", EventoSchema);
