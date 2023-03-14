const { Schema, model } = require('mongoose');


const PacienteSchema = Schema({
    name: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono_movil: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    cp: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true
    }
    ,
    provincia: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
      }
});

module.exports = model('Paciente', PacienteSchema );