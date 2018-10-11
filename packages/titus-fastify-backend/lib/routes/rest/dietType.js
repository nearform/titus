const fastifyPlugin = require('fastify-plugin')
const httpErrors = require('http-errors')

const errorHandler = require('../../error-handler')

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
    path: '/diet-type/:id',
    method: 'POST',
    schema: {
      tags: ['diet-type'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          visible: { type: 'boolean' }
        },
        additionalProperties: false
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params
      const { name, visible } = request.body

      if (name == null && visible == null) {
        return new httpErrors.BadRequest()
      }

      return request.dbClient.dietType.update({ id, name, visible })
    }
  })

  server.setErrorHandler((err, request, reply) => {
    reply.send(errorHandler(err))
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'diet-type-routes'
})
