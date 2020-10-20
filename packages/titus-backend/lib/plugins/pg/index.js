'use strict'

require('pg-range').install(require('pg'))
const fp = require('fastify-plugin')

async function plugin(server, options) {
  server.register(require('fastify-postgres'), {
    ...options.pgPlugin,
    password: server.secrets.dbPassword
  })
}

module.exports = fp(plugin, {
  name: 'pg',
  dependencies: ['secrets-manager']
})
