'use strict'

const packageJson = require('../../../package.json')

const health = () => ({
  method: 'GET',
  path: '/healthcheck',
  config: {
    auth: false,
    tags: ['api'],
    plugins: {
      pgPlugin: { transactional: true },
      auth: {
        action: '*',
        resource: '*'
      }
    }
  },
  handler: async request => {
    const frontend = {
      version: packageJson.version,
      serverTimestamp: new Date(),
      status: 'ok'
    }

    const dbRes = await request.pg.query('SELECT $1::text as message', [
      'Hello world!'
    ])

    try {
      frontend.db = dbRes && dbRes.rowCount === 1 ? 'OK' : 'FAIL'

      return request.generateResponse(frontend).code(200)
    } catch (e) {
      console.log('error: ', e)
    }
  }
})

module.exports = (server, config) => [health(server, config)]
