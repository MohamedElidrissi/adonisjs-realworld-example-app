'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
  up() {
    this.create('articles', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('desc').notNullable()
      table.text('body').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('articles')
  }
}

module.exports = ArticleSchema
