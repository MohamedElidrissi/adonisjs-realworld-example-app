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

  async login({ auth, request, response, session }) {
    const { email, password } = request.only(['email', 'password'])

    await auth.attempt(email, password)

    response.route('home')
  }
}

module.exports = AuthController
