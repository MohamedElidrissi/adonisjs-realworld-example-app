'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')}  */
const Factory = use('Factory')

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const Article = use('App/Models/Article')

/** @type {import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Create Article')

trait('Auth/Client')
trait('Session/Client')
trait('Test/Browser')
trait('DatabaseTransactions')

test('create a new article', async ({ assert, browser }) => {
  // create a dummy user
  const user = await Factory
    .model('App/Models/User')
    .create()

  // visit the editor page while logged in
  const page = await browser.visit('/editor', request => {
    request.loginVia(user)
  })

  // create a dummy article
  const { title, desc, body } = await Factory
    .model('App/Models/Article')
    .make()

  // fill all the fields
  await page
    .type('input[name="title"]', title)
    .type('input[name="desc"]', desc)
    .type('textarea[name="body"]', body)
    .submitForm('form')
    .waitForNavigation()

  const newArticle = await Article.findBy('title', title)
  await assert.equal(newArticle.desc, desc)
  await assert.equal(newArticle.body, body)
  await assert.equal(newArticle.user_id, user.id)
})
