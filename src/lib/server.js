'Use strict'
// Inicializamos Base de Datos

var mongoose = require('mongoose')
var conn = mongoose.connection

conn.on('error', (err) =>
  console.error('mongodb connection error', err))
conn.once('open', () =>
  console.info('Connected to mongodb in DB name: ', mongoose.connection.name))

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// mongoose.connect('mongodb://localhost/anuncios', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

module.exports = mongoose.connection
