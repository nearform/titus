const fastify = require('fastify')

const build = async (plugins) => {
  const server = fastify({
    logger: false
  })

  plugins.reduce((server, { plugin, options }) => server.register(plugin, options), server)

  await server.ready()

  return server
}

module.exports = build
