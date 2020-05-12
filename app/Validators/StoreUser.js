'use strict'

class StoreUser {
  get rules() {
    return {
      username: 'required|string|unique:users',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  get messages() {
    return {
      'username.unique': 'This username is already used'
    }
  }
}

module.exports = StoreUser
