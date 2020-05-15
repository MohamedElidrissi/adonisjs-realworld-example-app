'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
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

test("update user settings", async ({ assert, browser }) => {
  // create a dummy user
  const user = await Factory
    .model('App/Models/User')
    .create()

  // visit the settings page while logged in
  const page = await browser.visit('/settings', request => {
    request.loginVia(user)
  })

  const [image, username, bio, email, password] = [
    'https://cdn.vox-cdn.com/thumbor/ub0bmQ3BvFOEwu-JbUlQWr7sDQc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/11071561/metal_gear_peace_walker_snake_eater_0828_09.jpg',
    'UpdatedUsername',
    'updated bio',
    'updated.email@email.com',
    'updatedPassw0rd'
  ]

  // update fields
  await page
    .clear('input[name="image"]')
    .clear('input[name="username"]')
    .clear('textarea[name="bio"]')
    .clear('input[name="email"]')
    .clear('input[name="password"]')
    .type('input[name="image"]', image)
    .type('input[name="username"]', username)
    .type('textarea[name="bio"]', bio)
    .type('input[name="email"]', email)
    .type('input[name="password"]', password)
    .submitForm('form')
    .waitForNavigation()

  /** @type {import('@adonisjs/framework/src/Hash')}  */
  const Hash = use('Hash')

  // username should be updated
  const updatedUser = await User.findBy('id', user.id)
  await assert.equal(updatedUser.image, image)
  await assert.equal(updatedUser.username, username)
  await assert.equal(updatedUser.bio, bio)
  await assert.equal(updatedUser.email, email)
  await assert.ok(Hash.verify(password, updatedUser.password))
})
