const fastifyPlugin = require('fastify-plugin')

const foodGroupClient = require('../../rest/foodGroup')

function plugin (server, opts, next) {
  server.route({
    path: '/foodgroup',
    method: 'GET',
    handler: async (request, reply) => {
      return foodGroupClient.getAll(server.pg)
    }
  })

  server.route({
    path: '/foodgroup/:id',
    method: 'GET',
    handler: async (request, reply) => {
      const { id } = request.params

      return foodGroupClient.getById(server.pg, { id })
    }
  })

  server.route({
    path: '/foodgroup/list/:ids',
    method: 'GET',
    handler: async (request, reply) => {
      const { ids } = request.params

      return foodGroupClient.getByIds(server.pg, ids)
    }
  })

  server.route({
    path: '/foodgroup',
    method: 'PUT',
    handler: async (request, reply) => {
      const { name } = request.params

      return foodGroupClient.create(server.pg, { name })
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-group-routes'
})
