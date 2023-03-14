const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    codigoProducto: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    unidades: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
      }
});

module.exports = model('Producto', ProductoSchema );