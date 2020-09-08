'use strict'

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

// Conectar a la base de datos
require('./lib/server')
require('./models/anuncio')

// settings

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use((req, res, next) => {
  console.log(`${req.url} -${req.method}`)
  next()
})
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// website routes
app.use(require('./routes/index'))

// API routes
app.use('/api/anuncios', require('./routes/api/anuncios'))

// static files (fotos, archivos,estilos,etc)
app.use(express.static(path.join(__dirname, 'public')))

// 404 cuando no se encuentra ruta
app.use((req, res, next) => {
  res.status(404).send('404 not found')
})
// error handler
app.use(function (err, req, res, next) {
  if (err.array) { // error de validación
    err.status = 422
    const errInfo = err.array({ onlyFirstError: true })[0]
    err.message = `El parámetro ${errInfo.param} ${errInfo.msg}`
  }

  res.status(err.status || 500)

  if (req.originalUrl.startsWith('/api/')) { // API request
    res.json({ error: err.message })
    return
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.render('error')
})

// Servidor en puerto 3000
var port = process.env.PORT || '5000'
app.set('port', port)

async function main () {
  await app.listen(port)
  console.log('Server on port 5000')
}

main()
