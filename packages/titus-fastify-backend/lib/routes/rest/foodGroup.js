const fastifyPlugin = require('fastify-plugin')

const foodGroupClient = require('../../rest/foodGroup')

function plugin (server, opts, next) {
  server.get('/foodgroup', async (request, reply) => {
    return foodGroupClient.getAll(server.pg)
  })

  server.get('/foodgroup/:id', async (request, reply) => {
    const { id } = request.params

    return foodGroupClient.getById(server.pg, { id })
  })

  server.get('/foodgroup/list/:ids', async (request, reply) => {
    const { ids } = request.params

    return foodGroupClient.getByIds(server.pg, ids)
  })

  server.put('/foodgroup', async (request, reply) => {
    const { name } = request.params

    return foodGroupClient.create(server.pg, { name })
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-group-routes'
})
