const fastifyPlugin = require('fastify-plugin')

const foodHistoryClient = require('../../rest/foodHistory')

function plugin (server, opts, next) {
  server.get('/food/history/:id', async (request, reply) => {
    const { id } = request.params

    return foodHistoryClient.findByFoodId(server.pg, { id })
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'food-history-routes'
})
