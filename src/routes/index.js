'use strict'
const express = require('express')
const router = express.Router()
const fs = require('fs')
const Anuncio = require('../models/anuncio')

const jsonItem = fs.readFileSync('src/anuncios.json', 'utf-8')
let items = JSON.parse(jsonItem)

// Get anuncios
router.get('/', async (req, res, next) => {
  try {
    const anuncios = await Anuncio.find()
    console.log(anuncios)
    res.render('index', { items })
  } catch (err) {
    next(err)
  }
})

// ruta para nuevo Anuncio
router.get('/new-item', (req, res) => {
  res.render('new-item')
})

// Get anuncio por id  GET/anuncios/id
router.get('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id
    const anuncio = await Anuncio.findOne({ _id: _id })
    res.json({ result: anuncio })
  } catch (err) {
    next(err)
  }
})

// Crear Nuevo Anuncio y guardarlo en base de datos y anuncios.json
router.post('/new-item', async (req, res) => {
  const { name, price, sale, tags, photo } = req.body
  const anuncio = new Anuncio(req.body)
  await anuncio.save()
  if (!name || !price || !sale || !tags || !photo) {
    res.status(400).send('introduce todos los campos')
    return
  }
  const newItem = {
    id: anuncio._id,
    name,
    price,
    sale,
    tags,
    photo
  }
  items.push(newItem)
  const jsonItems = JSON.stringify(items)
  fs.writeFileSync('src/anuncios.json', jsonItems, 'utf-8')
  res.redirect('/')
})
// para borrar los anuncios
router.get('/delete/:id', async (req, res) => {
  items = items.filter(item => item.id !== req.params.id)
  const { id } = req.params
  await Anuncio.deleteOne({ _id: id })
  const jsonItems = JSON.stringify(items)
  fs.writeFileSync('src/anuncios.json', jsonItems, 'utf-8')
  res.redirect('/')
})
module.exports = router
