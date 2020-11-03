'use strict'

require('dotenv').config()

const amqplib = require('amqplib') // si lo queremos con callbacks: amqplib/callback_api

//const connectionPromise = amqplib.connect(process.env.AMQP_CONNECTION_STRING)

const connectionPromise = amqplib.connect('amqps://dqfollus:yYWfrsqpl7ZGsbMKhN-39m4bk4Hn01Zx@chinook.rmq.cloudamqp.com/dqfollus')

module.exports = connectionPromise
