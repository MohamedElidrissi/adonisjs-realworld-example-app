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

test('redirect the user to login page with old values when the credentials are invalid', async ({ assert, browser }) => {
  // create a dummy user
  const user = await Factory
    .model('App/Models/User')
    .create()

  // visit the login page
  const page = await browser.visit('/login')

  // fill all the fields with valid inputs
  await page
    .type('input[name="email"]', user.email)
    .type('input[name="password"]', 'GuessedPassword')
    .submitForm('form')
    .waitForNavigation()

  // we should be redirected to the home page
  await page.assertPath('/login')

  // we should see the appropriate message in the page
  await page.assertHasIn('.error-messages', 'Invalid email or password')

  // we should see the old email filled in the input
  await page.assertValue('input[name="email"]', user.email)
}).timeout(0)
