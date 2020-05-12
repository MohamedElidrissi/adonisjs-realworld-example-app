'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Register User')

trait('Test/Browser')
trait('DatabaseTransactions')

test('register the user and redirect to home if all inputs are valid', async ({ assert, browser }) => {
  // visit the register page
  const page = await browser.visit('/register')

  const [username, email] = ['mohamed', 'mohamed@gmail.com']

  // fill all the fields with valid inputs
  await page
    .type('input[name="username"]', username)
    .type('input[name="email"]', email)
    .type('input[name="password"]', 'mySecretPassword')
    .submitForm('form')
    .waitForNavigation()

  // we should be redirected to home page
  await page.assertPath('/')

  // we should have the username displayed in the navbar
  await page.assertHasIn('.navbar', username)

  // the user should be in the database
  const user = await User.findBy('email', email)

  await assert.equal(user.username, username)
  await assert.equal(user.email, email)
}).timeout(20_000) // extend timeout duration

test('redirect back to registration page and show error if username is already in use', async ({ assert, browser }) => {
  // visit the register page
  const page = await browser.visit('/register')

  // create a dummy user
  const user = await Factory.model('App/Models/User').create()

  // fill the username field with an already used username
  await page
    .type('input[name="username"]', user.username)
    .type('input[name="email"]', 'mohamed@gmail.com')
    .type('input[name="password"]', 'mySecretPassword')
    .submitForm('form')
    .waitForNavigation()

  // we should be redirected back to the registration page
  await page.assertPath('/register')

  // we should have see the appropriate message in the page
  await page.assertHasIn('.error-messages', 'This username is already used')
}).timeout(20_000)
