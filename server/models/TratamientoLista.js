const { Schema, model } = require('mongoose');


const TratamientoListaSchema = Schema({
    name: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    unique: true
  }
});

module.exports = model('TratamientoLista', TratamientoListaSchema);