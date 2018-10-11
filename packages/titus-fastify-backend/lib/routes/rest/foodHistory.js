const fastifyPlugin = require('fastify-plugin')
const httpErrors = require('http-errors')

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

      try {
        const row = await request.dbClient.food.history({ foodId })

        return row
      } catch (err) {
        if (err.isDBError && err.isNotFound) {
          return new httpErrors.NotFound()
        }

        return new httpErrors.InternalServerError()
      }
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-history-routes'
})
