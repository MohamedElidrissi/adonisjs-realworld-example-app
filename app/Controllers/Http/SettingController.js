'use strict'

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

class SettingController {
  async index({ view }) {
    return view.render('user.settings')
  }

  async update({ auth, request, response }) {
    const userData = request.only(['image', 'username', 'email', 'bio', 'password'])

    const user = await User.findBy('id', auth.user.id)
    user.merge(userData)
    await user.save()

    response.redirect('settings')
  }
}

module.exports = SettingController
