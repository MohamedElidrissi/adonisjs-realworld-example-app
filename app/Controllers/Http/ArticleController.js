'use strict'

/** @type {import('@adonisjs/lucid/src/Lucid/Model')}  */
const Article = use('App/Models/Article')

class ArticleController {
  async store({ auth, request, response }) {
    const articleData = request.only(['title', 'desc', 'body'])

    await Article.create({
      ...articleData,
      user_id: auth.user.id
    })

    response.redirect('home')
  }
}

module.exports = ArticleController
