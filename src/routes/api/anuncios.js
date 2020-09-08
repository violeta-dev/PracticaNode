'use strict'

var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var anuncios = mongoose.model('anuncios')
const multer = require('multer')

// Configuro multer y rutas y además cargo las imágenes en /src/public/img

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/img')
  },
  filename: function (req, file, cb) {
    const myFilename = `${file.originalname}`
    cb(null, myFilename)
  }
})
const upload = multer({ storage: storage })

router.post('/public', upload.single('imagen'), (req, res, next) => {
  console.log(req.file)
  res.send('ok')
})

// leer lista de anuncios
router.get('/', function (req, res, next) {
  var name = req.query.name
  var sale = req.query.sale
  var price = req.query.price
  var photo = req.query.photo
  var tags = req.query.tags

  // Convertimos limit y skip a número y le ponemos un limit por defecto a 10
  var limit = parseInt(req.query.limit || 10) || null
  var skip = parseInt(req.query.skip) || null
  // Creo filtro 'fields' para filtrar solamente por un campo
  var fields = req.query.fields || null
  var sort = req.query.sort || null

  // Valido primero si existen los filtros, si no existe filtro que salga la lista completa
  var filter = {}
  if (name) {
    filter.name = new RegExp('^' + req.query.name, 'i') || name
  }
  if (price) {
    filter.price = price
  }

  if (tags) {
    filter.tags = tags
  }
  if (photo) {
    filter.photo = photo
  }
  if (sale) {
    filter.sale = sale
  }
  // En el método list definido en el modelo  le digo los filtros a usar
  anuncios.list(filter, limit, skip, fields, sort, function (err, list) {
    if (err) {
      next(err)
      return
    }
    res.json({ ok: true, list: list })
  })
})
// Get anuncio por id  GET api/anuncios/id
router.get('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id
    const anuncio = await anuncios.findOne({ _id: _id })
    res.json({ result: anuncio })
  } catch (err) {
    next(err)
  }
})

// crear anuncio POST /api/anuncios
router.post('/', function (req, res, next) {
  var anuncio = new anuncios(req.body)
  anuncio.save(function (err, anuncioGuardado) {
    if (err) {
      return next(err)
    }
    res.json({ ok: true, anuncio: anuncioGuardado })
  })
})

// modificar anuncio PUT /api/anuncios

router.put('/:id', function (req, res, next) {
  var id = req.params.id
  anuncios.updateOne({ _id: id }, req.body, function (err, anuncio) {
    if (err) {
      return next(err)
    }
    res.json({ ok: true, anuncio: anuncio })
  })
})

// borrar anuncio DELETE /api/anuncios/id
router.delete('/:id', function (req, res, next) {
  var id = req.params.id
  anuncios.deleteOne({ _id: id }, req.body, function (err, anuncio) {
    if (err) {
      return next(err)
    }
    res.json({ ok: true, anuncio: anuncio })
  })
})

module.exports = router
