const fastifyPlugin = require('fastify-plugin')

const errorHandler = require('../../error-handler')

function plugin (server, opts, next) {
  server.route({
    path: '/food/history/:foodId',
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
      const { foodId } = request.params

      return request.dbClient.food.history({ foodId })
    }
  })

  server.setErrorHandler((err, request, reply) => {
    reply.send(errorHandler(err))
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-history-routes'
})
