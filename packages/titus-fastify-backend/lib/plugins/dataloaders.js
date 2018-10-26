const fastifyPlugin = require('fastify-plugin')
const dataloaders = require('../dataloaders')

function plugin(server, options, next) {
  server.addHook('preHandler', async (request, reply) => {
    request.dataloaders = dataloaders(request.dbClient)
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'dataloaders-plugin',
  dependencies: ['db-client-plugin']
})
