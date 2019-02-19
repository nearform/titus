const axios = require('axios')
const startServer = require('./server')
const config = require('../config/default')

describe('server', () => {
  let server
  let level

  beforeAll(async () => {
    level = config.logLevel
    config.logLevel = 'silent'
  })

  afterEach(async () => {
    if (server) {
      await server.stop()
    }
  })

  afterAll(async () => {
    config.logLevel = level
  })

  it('starts a server handling 404', async () => {
    server = await startServer()
    const response = await axios.get(`${server.info.uri}/unknown`, {
      validateStatus: () => true
    })
    expect(response.status).toBe(404)
  })
})
