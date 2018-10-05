const fastifyPlugin = require('fastify-plugin')

const foodClient = require('../../rest/food')

function plugin (server, opts, next) {
  server.route({
    path: '/food',
    method: 'GET',
    handler: async (request, reply) => {
      const { offset, limit } = request.query

      return foodClient.getAll(server.pg, { offset, limit })
    }
  })

  server.route({
    path: '/food/:id',
    method: 'GET',
    handler: async (request, reply) => {
      const { id } = request.params

      return foodClient.getById(server.pg, { id })
    }
  })

  server.route({
    path: '/food/search/:type/:needle',
    method: 'GET',
    handler: async (request, reply) => {
      const { type, needle } = request.params

      return foodClient.search(server.pg, { type, needle })
    }
  })

  server.route({
    path: '/food/keyword/:keywordType/:needle',
    method: 'GET',
    handler: async (request, reply) => {
      const { keywordType, needle } = request.params

      return foodClient.keyword(server.pg, { keywordType, needle })
    }
  })

  server.route({
    path: '/food',
    method: 'PUT',
    handler: async (request, reply) => {
      const { name, foodGroupId } = request.body

      const food = {
        name,
        foodGroupId
      }

      return foodClient.create(server.pg, { food })
    }
  })

  server.route({
    path: '/food',
    method: 'POST',
    handler: async (request, reply) => {
      const { id, name, foodGroupId } = request.body

      const food = {
        id,
        name,
        foodGroupId
      }

      return foodClient.update(server.pg, { food })
    }
  })

  server.route({
    path: '/food/:ids',
    method: 'DELETE',
    handler: async (request, reply) => {
      const { ids } = request.params

      return foodClient.deleteFoods(server.pg, { ids })
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-routes'
})
