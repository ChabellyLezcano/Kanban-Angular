const { Schema, model } = require('mongoose');


const PresupuestoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: false
    },
    fecha: {
        type: Date,
        required: true
    }
    ,
    categoria: {
        type: String,
        required: true
    }
});

module.exports = model('Presupuesto', PresupuestoSchema );