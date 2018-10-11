const fastifyPlugin = require('fastify-plugin')
const httpErrors = require('http-errors')

function plugin (server, opts, next) {
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

      try {
        const row = await request.dbClient.foodGroup.getById({ id })

        return row
      } catch (err) {
        if (err.isDBError && err.isNotFound) {
          return new httpErrors.NotFound()
        }

        return new httpErrors.InternalServerError()
      }
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

      try {
        const data = await request.dbClient.foodGroup.create({ name })

        return data
      } catch (err) {
        if (err.isDBError) {
          if (err.isDuplicateKey) return new httpErrors.BadRequest()
          if (err.isForeignKeyViolation) return new httpErrors.BadRequest()
        }

        return new httpErrors.InternalServerError()
      }
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-group-routes'
})
