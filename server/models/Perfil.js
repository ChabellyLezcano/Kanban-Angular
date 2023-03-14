const { Schema, model } = require("mongoose");

const PerfilSchema = Schema({
  foto: {
    type: String,
    require: false 
  },
  direccion: {
    type: String,
    required: true,
  },
  cp: {
    type: String,
    required: true,
  },
  nif: {
    type: String,
    required: true,
    unique: true,
  },
  telefono_movil: {
    type: String,
    required: true,
  },
  telefono_fijo: {
    type: String,
    required: true,
  },
  municipio: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    unique: true
  }
});

module.exports = model("Perfil", PerfilSchema);
