const fastifyPlugin = require('fastify-plugin')

function plugin (server, opts, next) {
  server.route({
    path: '/food',
    method: 'GET',
    schema: {
      tags: ['food']
    },
    handler: async (request, reply) => {
      const { offset, limit } = request.query

      return request.dbClient.food.getAll({ offset, limit })
    },
    config: {
      trail: true
    }
  })

  server.route({
    path: '/food/:id',
    method: 'GET',
    schema: {
      tags: ['food']
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
      tags: ['food']
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
      tags: ['food']
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
      tags: ['food']
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
      tags: ['food']
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
      tags: ['food']
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
