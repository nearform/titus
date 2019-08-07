'use strict'

require('pg-range').install(require('pg'))
const fp = require('fastify-plugin')

async function plugin(server, options) {
  server.register(require('fastify-postgres'), options.pgPlugin)
}

module.exports = fp(plugin)
