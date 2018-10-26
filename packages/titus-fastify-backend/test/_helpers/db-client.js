const fastifyPlugin = require('fastify-plugin')

function plugin(server, options, next) {
  server.decorateRequest('dbClient', {
    getter() {
      return options.endpoints
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'fake-db-client-plugin'
})
