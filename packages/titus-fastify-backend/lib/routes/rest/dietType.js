const fastifyPlugin = require('fastify-plugin')

const dietTypeClient = require('../../rest/dietType')

function plugin (server, opts, next) {
  server.route({
    path: '/diet/type',
    method: 'GET',
    handler: async (request, reply) => {
      return dietTypeClient.getAll(server.pg)
    }
  })

  server.route({
    path: '/diet/type/:id',
    method: 'DELETE',
    handler: async (request, reply) => {
      const { id } = request.params

      return dietTypeClient.deleteDietType(server.pg, id)
    }
  })

  server.route({
    path: '/diet/type/visibility/:id',
    method: 'POST',
    handler: async (request, reply) => {
      const { id } = request.params

      return dietTypeClient.toggleDietTypeVisibility(server.pg, { id })
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'diet-type-routes'
})
