const fastifyPlugin = require('fastify-plugin')

function plugin (server, opts, next) {
  server.route({
    path: '/food/history/:id',
    method: 'GET',
    schema: {
      tags: ['food-history'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params

      return request.dbClient.foodHistory.findByFoodId({ id })
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-history-routes'
})
