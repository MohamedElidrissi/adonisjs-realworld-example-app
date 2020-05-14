'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/vow/src/Suite')}  */
const { test, trait } = use('Test/Suite')('Settings Page')

trait('Auth/Client')
trait('Session/Client')
trait('Test/Browser')
trait('DatabaseTransactions')

test("All fields are filled with user's data initially", async ({ browser }) => {
  // create a dummy user
  const user = await Factory
    .model('App/Models/User')
    .create()

  // visit the settings page while logged in
  const page = await browser.visit('/settings', request => {
    request.loginVia(user)
  })

  // we should see all the fields filled with the user's data
  await page.assertValue('input[name="image"]', user.image)
  await page.assertValue('input[name="username"]', user.username)
  await page.assertValue('textarea[name="bio"]', user.bio)
  await page.assertValue('input[name="email"]', user.email)
})
