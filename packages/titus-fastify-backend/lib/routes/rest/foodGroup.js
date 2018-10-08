const fastifyPlugin = require('fastify-plugin')

function plugin (server, opts, next) {
  server.route({
    path: '/foodgroup',
    method: 'GET',
    handler: async (request, reply) => {
      return request.dbClient.foodGroup.getAll(server.pg)
    }
  })

  server.route({
    path: '/foodgroup/:id',
    method: 'GET',
    handler: async (request, reply) => {
      const { id } = request.params

      return request.dbClient.foodGroup.getById({ id })
    }
  })

  server.route({
    path: '/foodgroup/list/:ids',
    method: 'GET',
    handler: async (request, reply) => {
      const { ids } = request.params

      return request.dbClient.foodGroup.getByIds(ids)
    }
  })

  server.route({
    path: '/foodgroup',
    method: 'PUT',
    handler: async (request, reply) => {
      const { name } = request.params

      return request.dbClient.foodGroup.create({ name })
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-group-routes'
})
