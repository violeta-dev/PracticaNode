'use strict'
// require('dotenv').config({ path: '../' })

require('dotenv').config()

const readline = require('readline')
const conn = require('./lib/server')
const Anuncio = require('./models/anuncio')
const Usuario = require('./models/Usuario')
const fs = require('fs')

const jsonItem = fs.readFileSync('src/anuncios.json', 'utf-8')
const items = JSON.parse(jsonItem)

conn.once('open', async () => {
  try {
    const respuesta = await askUser('Estas seguro de inicializar DB? (no/si)')
    if (respuesta.toLowerCase() !== 'si') {
      console.log('Proceso abortado.')
      return process.exit(0)
    }
    await initUsuarios()
    await initAnuncios()
    // cerrar la conexión
    conn.close()
  } catch (err) {
    console.log('Hubo un error:', err)
    process.exit(1)
  }
})

async function initAnuncios () {
  // Borrar documentos existentes de la collección
  console.log('Vaciando lista de anuncios')
  await Anuncio.deleteMany()
  console.log(items)
  // Cargar los documentos
  console.log('Cargando anuncios...')
  const result = await Anuncio.insertMany(items)
  console.log(`Se han creado ${result.length} anuncios`)
}
async function initUsuarios () {
  // borrar documentos existentes de la colección
  console.log('Vaciando colección de usuarios...')
  await Usuario.deleteMany()

  // cargar los documentos iniciales
  console.log('Cargando usuarios...')
  const result = await Usuario.insertMany([
    { email: 'user@example.com', password: 1234 }
  ])
  console.log(`Se han creado ${result.length} usuarios.`)
}

function askUser (question) {
  return new Promise((resolve, reject) => {
    const interf = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    interf.question(question, answer => {
      interf.close()
      resolve(answer)
    })
  })
}
