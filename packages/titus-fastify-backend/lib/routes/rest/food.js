const fastifyPlugin = require('fastify-plugin')
const errorHandler = require('../../error-handler')

function plugin(server, opts, next) {
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

      return request.dbClient.food.getById({ id })
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
          type: {
            type: 'string',
            enum: [
              'startsWith',
              'endsWith',
              'fullText',
              'similarity',
              'contains'
            ]
          },
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
          keywordType: {
            type: 'string',
            enum: [
              'startsWith',
              'contains',
              'endsWith',
              'levenshtein',
              'soundex',
              'metaphone',
              'trigram'
            ]
          },
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
    path: '/food',
    method: 'DELETE',
    schema: {
      tags: ['food'],
      body: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    },
    handler: async (request, reply) => {
      const ids = request.body

      return request.dbClient.food.delete({ ids })
    }
  })

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
  name: 'food-routes'
})
