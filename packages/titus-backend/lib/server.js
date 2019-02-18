const hapi = require('hapi')
const config = require('../config/default')
const plugins = require('./plugins')
const routes = require('./routes')

module.exports = async () => {
  const server = hapi.server(config.hapi)

  await server.register(plugins)
  await server.register(routes)
  await server.start()

  server.logger().info(`Server running at: ${server.info.uri}`)
  return server
}
