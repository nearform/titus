const buildServer = require('../build-server')

const i18nRoutes = require('../../lib/routes/translations')

let server

beforeAll(async () => {
  const plugins = [{ plugin: i18nRoutes }]

  server = await buildServer(plugins)
})

test('translation API returns resource object', async () => {
  const expectedResponse = {
    welcome: 'Welcome to titus and react-i18next',
    description: 'This is a sample localized resource stored on the server'
  }

  const response = await server.inject({ method: 'GET', url: '/locales/en/translations' })
  const body = JSON.parse(response.body)

  expect(response.statusCode).toEqual(200)
  expect(body).toEqual(expectedResponse)
})

test('translation API returns resource object', async () => {
  const response = await server.inject({ method: 'GET', url: '/locales/ch/translations' })

  expect(response.statusCode).toEqual(404)
  expect(response.statusMessage).toEqual('Not Found')
})

afterAll(() => {
  server.close()
})
