const fastifyPlugin = require('fastify-plugin')

const dietTypeClient = require('../../rest/dietType')

function plugin (server, opts, next) {
  server.get('/diet/type', async (request, reply) => {
    return dietTypeClient.getAll(server.pg)
  })

  server.delete('/diet/type/:id', async (request, reply) => {
    const { id } = request.params

    return dietTypeClient.deleteDietType(server.pg, id)
  })

  server.post('/diet/type/visibility/:id', async (request, reply) => {
    const { id } = request.params

    return dietTypeClient.toggleDietTypeVisibility(server.pg, { id })
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'diet-type-routes'
})
