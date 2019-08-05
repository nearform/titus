const path = require('path')
const autoLoad = require('fastify-autoload')
const cors = require('fastify-cors')
/**
 * Configure and starts Fastify server with all required plugins and routes
 * @async
 * @param {Object} config - optional configuration options (default to ./config module)
 *                          May contain a key per plugin (key is plugin name), and an extra
 *                          'fastify' key containing the server configuration object
 * @returns {Fastify.Server} started Fastify server instance
 */

module.exports = async (config = require('./config')) => {
  const server = require('fastify')(config.fastifyInit)

  server
    .register(cors, config.cors)
    .register(autoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: config
    })
    .register(autoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: config
    })

  try {
    const address = await server.listen(config.fastify)
    server.log.info(`Server running at: ${address}`)
  } catch (err) {
    server.log.error(err)
  }

  return server
}
