'use strict'

const express = require('express')
const path = require('path')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
var app = express()

// Conectar a la base de datos
require('./lib/server')
require('./models/anuncio')

// Poner autenticacion
const loginController = require('./routes/loginController')
const jwtAuth = require('./lib/jwtAuth')

// settings

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', require('ejs').__express)

// app.set('view engine', 'ejs')

// middlewares
app.use((req, res, next) => {
  console.log(`${req.url} -${req.method}`)
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// Setup de i18n

const i18n = require('./lib/i18nConfigure')
app.use(i18n.init) // metemos un middleware a express

// website routes
app.use('/', require('./routes/index'))

app.use('/change-locale', require('./routes/change-locale'))

app.get('/login', loginController.index)
// app.post('/login', loginController.post)
// API routes con JWT
app.post('/api/loginJWT', loginController.postJWT)
app.use('/api/anuncios', jwtAuth(), require('./routes/api/anuncios'))
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
var port = process.env.PORT || '3000'
app.set('port', port)

async function main () {
  await app.listen(port)
  console.log('Server on port 3000')
}

main()

module.exports = app
