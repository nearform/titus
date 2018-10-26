const fastifyPlugin = require('fastify-plugin')

const errorHandler = require('../../error-handler')

function plugin(server, opts, next) {
  server.route({
    path: '/food-group',
    method: 'GET',
    schema: {
      tags: ['food-group']
    },
    handler: async (request, reply) => {
      return request.dbClient.foodGroup.getAll()
    }
  })

  server.route({
    path: '/food-group/:id',
    method: 'GET',
    schema: {
      tags: ['food-group'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params

      return request.dbClient.foodGroup.getById({ id })
    }
  })

  server.route({
    path: '/food-group',
    method: 'PUT',
    schema: {
      tags: ['food-group'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        },
        additionalProperties: false
      }
    },
    handler: async (request, reply) => {
      const { name } = request.body

      return request.dbClient.foodGroup.create({ name })
    }
  })

  server.setErrorHandler((err, request, reply) => {
    reply.send(errorHandler(err))
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-group-routes'
})
