'use strict'

class CreateArticle {
  get rules() {
    return {
      title: 'required|string',
      desc: 'required|string',
      body: 'required|string'
    }
  }
}

module.exports = CreateArticle
