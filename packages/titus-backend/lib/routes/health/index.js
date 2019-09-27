'use strict'

const { version } = require('../../../package')
const fp = require('fastify-plugin')
async function health(server, options) {
  server.register(require('under-pressure'), options.underPressure).route({
    method: 'GET',
    url: '/healthcheck',
    handler: async ({ log }) => {
      let dbRes
      try {
        const client = await server.pg.connect()
        dbRes = await client.query('SELECT $1::text as message', [
          'Hello world!'
        ])
      } catch (err) {
        // swallow error
        log.debug({ err }, `failed to read DB during health check`)
      }
      return {
        version,
        serverTimestamp: new Date(),
        status: 'ok',
        memoryUsage: server.memoryUsage(),
        db: dbRes && dbRes.rowCount === 1 ? 'ok' : 'fail'
      }
    }
  })
}

module.exports = fp(health)
