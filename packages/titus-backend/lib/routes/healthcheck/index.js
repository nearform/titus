'use strict'

const { version } = require('../../../package')
async function healthcheck(server, options) {
  server.register(require('under-pressure'), options.underPressure).route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['healthcheck'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            version: { type: 'string' },
            serverTimestamp: { type: 'string' },
            status: { type: 'string' },
            memoryUsage: {
              type: 'object',
              properties: {
                eventLoopDelay: { type: 'string' },
                rssBytes: { type: 'number' },
                heapUsed: { type: 'number' }
              }
            },
            db: { type: 'string' }
          }
        }
      }
    },
    handler: async ({ log }) => {
      let dbRes
      try {
        dbRes = await server.pg.query('SELECT $1::text as message', [
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

module.exports = healthcheck
