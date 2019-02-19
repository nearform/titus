const axios = require('axios')
const startServer = require('./server')
const config = require('./config')

describe('server', () => {
  let server

  afterEach(async () => {
    if (server) {
      await server.stop()
    }
  })

  it('starts a server handling 404', async () => {
    server = await startServer({
      ...config,
      'hapi-pino': {
        ...config['hapi-pino'],
        level: 'silent'
      }
    })
    const response = await axios.get(`${server.info.uri}/unknown`, {
      validateStatus: () => true
    })
    expect(response.status).toBe(404)
  })
})
