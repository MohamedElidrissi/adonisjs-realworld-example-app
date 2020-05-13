'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Login User')

trait('Test/Browser')
trait('DatabaseTransactions')

test('login the user when the credentials are correct and redirect to home page', async ({ assert, browser }) => {
  const password = 'mySecretPassword'

  // create a dummy user
  const user = await Factory
    .model('App/Models/User')
    .create({ password })

  // visit the login page
  const page = await browser.visit('/login')

  // fill all the fields with valid inputs
  await page
    .type('input[name="email"]', user.email)
    .type('input[name="password"]', password)
    .submitForm('form')
    .waitForNavigation()

  // we should be redirected to the home page
  await page.assertPath('/')

  // we should be logged in
  await page.assertHasIn('.navbar', user.username)
}).timeout(0)
