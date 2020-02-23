'use strict'

const fp = require('fastify-plugin')
/**
 * Configure and starts Fastify server with all required plugins and routes
 * @async
 * @param {Object} config - optional configuration options (default to ./config module)
 *                          May contain a key per plugin (key is plugin name), and an extra
 *                          'fastify' key containing the server configuration object
 * @returns {Fastify.Server} started Fastify server instance
 */

async function plugin(server, config) {
  server.register(require('./routes'))
}

module.exports = fp(plugin)
