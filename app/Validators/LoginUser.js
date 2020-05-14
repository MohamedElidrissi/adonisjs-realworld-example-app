'use strict'

class LoginUser {
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = LoginUser
