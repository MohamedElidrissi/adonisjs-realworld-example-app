'use strict'

/** @type {import('@adonisjs/ignitor/src/Hooks')} */
const { hooks } = require('@adonisjs/ignitor')

function registerViewGlobals() {
  /** @type {import('@adonisjs/framework/src/View')} */
  const View = use('View')

  View.global('pageTitle', function (title) {
    return this.safe(`<title>${title} · Conduit</title>`)
  })
}

hooks.after.providersBooted(() => {
  registerViewGlobals()
})
