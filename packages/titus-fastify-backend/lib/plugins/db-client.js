const fastifyPlugin = require('fastify-plugin')

const dbClientFactory = require('../db-client')

function plugin (server, options, next) {
  const { pg } = server

  const dbClient = dbClientFactory({ pg })

  server.decorateRequest('dbClient', {
    getter () {
      return dbClient
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'db-client-plugin',
  dependencies: ['fastify-postgres']
})
