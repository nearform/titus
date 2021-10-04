import fp from 'fastify-plugin'
import underPressurePlugin from 'under-pressure'

import { version } from '../../../package.json'

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

async function healthCheck(server, { underPressure }, next) {
  server.register(underPressurePlugin, (parent) => ({
    ...underPressure,
    healthCheck: () => runCheck(parent)
  }))

  next()
}

export default fp(healthCheck, {
  name: 'healthCheck',
  dependencies: ['pg']
})
