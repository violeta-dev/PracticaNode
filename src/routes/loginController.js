'use strict'
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class LoginController {
  index (req, res, next) {
    res.locals.error = ''
    res.locals.email = ''

    res.render('login')
  }

  /**
   * POST /login
   */
  async post (req, res, next) {
    try {
      // recoger valores de entrada
      const email = req.body.email
      const password = req.body.password

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email })

      // si no existe el usuario o la password no coincide
      // mostrar un error
      if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        res.locals.error = res.__('Invalid credentials')
        res.locals.email = email
        res.render('login')
        return
      }

      // si el usuario existe y la password es correcta
      // redirigir a zona privada
      res.redirect('/privado')
    } catch (err) {
      next(err)
    }
  }

  /**
   * POST /api/loginJWT
   */
  async postJWT (req, res, next) {
    try {
      // recoger valores de entrada
      const email = req.body.email
      const password = req.body.password

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email })

      // si no existe el usuario o la password no coincide
      // mostrar un error
      if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        // responder un error de autenticación en JSON
        const error = new Error('invalid credentials')
        error.status = 401
        next(error)
        return
      }

      // si el usuario existe y la password es correcta

      // crear un JWT
      jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, tokenJWT) => {
        if (err) return next(err)

        // responder
        res.json({ tokenJWT: tokenJWT })
      })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = new LoginController()
