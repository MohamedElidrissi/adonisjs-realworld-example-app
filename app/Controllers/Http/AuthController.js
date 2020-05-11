'use strict'

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

class AuthController {
  async register({ auth, request, response, session }) {
    const userData = request.only(['username', 'email', 'password'])

    const newUser = await User.create(userData)

    await auth.login(newUser)

    response.route('home')
  }
}

module.exports = AuthController
