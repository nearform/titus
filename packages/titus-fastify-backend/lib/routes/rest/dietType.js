const fastifyPlugin = require('fastify-plugin')

function plugin (server, opts, next) {
  server.route({
    path: '/diet/type',
    method: 'GET',
    schema: {
      tags: ['diet-type']
    },
    handler: async (request, reply) => {
      return request.dbClient.dietType.getAll()
    }
  })

  server.route({
    path: '/diet/type/:id',
    method: 'DELETE',
    schema: {
      tags: ['diet-type'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params

      return request.dbClient.dietType.delete({ id })
    }
  })

  server.route({
    path: '/diet/type/visibility/:id',
    method: 'POST',
    schema: {
      tags: ['diet-type'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params

      return request.dbClient.dietType.toggleDietTypeVisibility({ id })
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'diet-type-routes'
})
