const fastifyPlugin = require('fastify-plugin')
const httpErrors = require('http-errors')

function plugin (server, opts, next) {
  server.route({
    path: '/food',
    method: 'GET',
    schema: {
      tags: ['food'],
      querystring: {
        type: 'object',
        properties: {
          offset: { type: 'number' },
          limit: { type: 'number' }
        }
      }
    },
    handler: async (request, reply) => {
      const { offset, limit } = request.query

      return request.dbClient.food.getAll({ offset, limit })
    }
  })

  server.route({
    path: '/food/:id',
    method: 'GET',
    schema: {
      tags: ['food'],
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
        const row = await request.dbClient.food.getById({ id })

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
    path: '/food/search/:type/:needle',
    method: 'GET',
    schema: {
      tags: ['food'],
      params: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          needle: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { type, needle } = request.params

      return request.dbClient.food.search({ type, needle })
    }
  })

  server.route({
    path: '/food/keyword/:keywordType/:needle',
    method: 'GET',
    schema: {
      tags: ['food'],
      params: {
        type: 'object',
        properties: {
          keywordType: { type: 'string' },
          needle: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { keywordType, needle } = request.params

      return request.dbClient.food.keyword({ keywordType, needle })
    }
  })

  server.route({
    path: '/food',
    method: 'PUT',
    schema: {
      tags: ['food'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          foodGroupId: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { name, foodGroupId } = request.body

      const food = {
        name,
        foodGroupId
      }

      return request.dbClient.food.create({ food })
    }
  })

  server.route({
    path: '/food',
    method: 'POST',
    schema: {
      tags: ['food'],
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          foodGroupId: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { id, name, foodGroupId } = request.body

      const food = {
        id,
        name,
        foodGroupId
      }

      return request.dbClient.food.update({ food })
    }
  })

  server.route({
    path: '/food/:ids',
    method: 'DELETE',
    schema: {
      tags: ['food'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { ids } = request.params

      return request.dbClient.food.deleteFoods({ ids })
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-routes'
})
