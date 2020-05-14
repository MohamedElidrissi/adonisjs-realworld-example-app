'use strict'

class SettingController {
  async index({ view }) {
    return view.render('user.settings')
  }
}

module.exports = SettingController
