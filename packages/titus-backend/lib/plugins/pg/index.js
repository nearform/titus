'use strict'

require('pg-range').install(require('pg'))
const fp = require('fastify-plugin')

async function plugin(server, options) {
  console.log('postgres loaded: ', server.secrets)
  server.register(require('fastify-postgres'), options.pgPlugin)
}

module.exports = fp(plugin)
