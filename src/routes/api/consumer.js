'use strict'

var jimp = require('jimp')
const path = require('path')
const connectionPromise = require('./connectAMQP')

const queueName = 'tareas'

main().catch(err => console.log('Hubo un error:', err))

async function main () {
  // conectar al servidor AMQP
  const conn = await connectionPromise

  // conectar a un canal
  const channel = await conn.createChannel()

  // asegurarnos que tenemos una cola donde publicar
  await channel.assertQueue(queueName, {
    durable: true // la cola sobrevive a reinicios del broker (rabbitMQ)
  })
  // cuantos mensajes quiero procesar en paralelo (número de deuda de acks)
  channel.prefetch(1)

  // nos suscribimos a una cola
  channel.consume(queueName, msg => {
    // hago el trabajo que tenga que hacer
    // Cojo en path de la imagen y se la paso a jimp
    var test = msg.content.toString()
    var ipath = test.replace(/['"]+/g, '')
    const images = path.join('../../public/img', ipath)
    console.log('Cojo imagen de /src/public/img y la convierto a thumbnail')

    jimp.read(images)
      .then(images => {
        return images
          .resize(100, 100) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write(Date.now() + 'thumbnail.jpg') // save
      })
      .catch(err => {
        console.error(err)
      })
    // y cuando haya terminado de hacer el trabajo

    channel.ack(msg) // indico a la cola que el mensaje está procesado correctamente
  })
}
