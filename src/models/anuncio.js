'use strict'

var mongoose = require('mongoose')

// Crear un esquema (https://mongoosejs.com/docs/schematypes.html)
// Tags permitidos
// Ponemos índices en los campos que vamos a filtrar
var permitted = ['work', 'lifestyle', 'motor', 'mobile']
var anuncioSchema = mongoose.Schema({
  name: {type: String, index: true },
  sale: {type: Boolean, index: true },
  price: {type: Number, index: true },
  photo: String,
  tags: {
    type: [String],
    enum: permitted,
    index: true,
    required: 'Please,specify at least one tag'

  }
})

// Método estático para filtrar, paginar, etc
anuncioSchema.statics.list = function (filter, limit, skip, fields, sort, cb) {
  if (filter.price < 0) {
    const precio = Math.abs(filter.price)
    const query = anuncios.find({
      price: {
        $lte: precio
      }
    })
    query.limit(limit)
    query.skip(skip)
    query.select(fields)
    query.sort(sort)
    query.exec(cb)
  } else {
    var query = anuncios.find(filter)
    query.limit(limit)
    query.skip(skip)
    query.select(fields)
    query.sort(sort)
    query.exec(cb)
  }

  /* var query = anuncios.find(filter)
  query.limit(limit)
  query.skip(skip)
  query.select(fields)
  query.sort(sort)
  query.exec(cb) */
}

// Crear el modelo
var anuncios = mongoose.model('anuncios', anuncioSchema)

// Exportar el modelo
module.exports = anuncios
