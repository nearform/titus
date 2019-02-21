const hapi = require('hapi')
const plugins = require('./plugins')
const routes = require('./routes')

/**
 * Configure and starts Hapi server with all required plugins and routes
 * @async
 * @param {Object} config - optional configuration options (default to ./config module)
 *                          May contain a key per plugin (key is plugin name), and an extra
 *                          'hapi' key containing the server configuration object
 * @returns {Hapi.Server} started Hapi server instance
 */
module.exports = async (config = require('./config')) => {
  const server = hapi.server(config.hapi)

  await server.register(
    plugins.concat(routes).map(plugin => ({
      plugin,
      options: config[plugin.name]
    }))
  )

  await server.start()

  server
    .logger()
    .info({ info: server.info }, `Server running at: ${server.info.uri}`)
  return server
}
