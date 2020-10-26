'use strict'

class LoginController {
  index (req, res, next) {
    res.send('ok')
  }
}

module.exports = new LoginController()
