'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  Route.on('/register').render('auth.register').as('register')
  Route.post('/register', 'AuthController.register').validator('StoreUser')

  Route.on('/login').render('auth.login').as('login')
  Route.post('/login', 'AuthController.login').validator('LoginUser')

}).middleware(['guest'])

Route.on('/').render('home').as('home')

Route.group(() => {

  Route.on('/editor').render('article.editor').as('editor')
  Route.post('/editor', 'ArticleController.store').validator('CreateArticle')

  Route.get('/settings', 'SettingController.index').as('settings')
  Route.post('/settings', 'SettingController.update').validator('UpdateSettings')

  Route.post('/logout', 'AuthController.logout').as('logout')

}).middleware(['auth'])
