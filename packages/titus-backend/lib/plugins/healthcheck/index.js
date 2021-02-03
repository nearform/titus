'use strict'

const fp = require('fastify-plugin')

const { version } = require('../../../package.json')

async function runCheck(server) {
  let dbRes
  try {
    dbRes = await server.pg.query('SELECT $1::text as message', [
      'Hello world!'
    ])
  } catch (err) {
    // swallow error
    server.log.debug({ err }, `failed to read DB during health check`)
  }

  return {
    version,
    serverTimestamp: new Date(),
    status: 'ok',
    memoryUsage: server.memoryUsage && server.memoryUsage(),
    db: dbRes && dbRes.rowCount === 1 ? 'ok' : 'fail'
  }
}

async function healthCheck(server, options, next) {
  server.register(require('under-pressure'), parent => {
    return {
      ...options.underPressure,
      healthCheck: () => runCheck(parent)
    }
  })

  next()
}

module.exports = fp(healthCheck, {
  name: 'healthCheck',
  dependencies: ['pg']
})
