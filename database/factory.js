'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker, _, data) => {
  return Object.assign({
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    bio: faker.sentence()
  }, data)
})
