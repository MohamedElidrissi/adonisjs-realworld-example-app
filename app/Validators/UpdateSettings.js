'use strict'

class UpdateSettings {
  get rules() {
    return {
      username: 'required|string',
      email: 'required|email',
      password: 'required|string',
      image: 'required|string',
      bio: 'string'
    }
  }
}

module.exports = UpdateSettings
