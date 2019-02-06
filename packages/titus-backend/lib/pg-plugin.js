'use strict'

const PgPool = require('pg-pool')
const pg = require('pg')
require('pg-range').install(pg)

const pluginName = 'pgPlugin'

const isTransactional = request => {
  const pluginOpts = request.route.settings.plugins[pluginName] || {}
  return !!pluginOpts.transactional
}

module.exports = {
  name: pluginName,
  register: async (server, options) => {
    const pool = new PgPool(options)

    server.ext({
      type: 'onPreHandler',
      method: async (request, h) => {
        if (!request.route.settings.plugins[pluginName]) {
          return h.continue
        }

        server.logger().debug('Getting database connection')
        request.pg = await pool.connect()

        if (isTransactional(request)) {
          server.logger().debug('Begin transaction')
          await request.pg.query('BEGIN')
        }
        return h.continue
      }
    })

    server.events.on('response', request => {
      if (request.pg) {
        if (isTransactional(request)) {
          const error =
            request.response &&
            (request.response.statusCode !== 200 ||
              (request.response.source && request.response.source.error))

          const action = error ? 'ROLLBACK' : 'COMMIT'
          server.logger().debug(action)
          try {
            request.pg.query(action)
          } catch (e) {
            server.logger().error(e)
          }
        }

        server.logger().debug('Returning database connection.')
        try {
          request.pg.release()
        } catch (e) {
          server.logger().error(e)
        }
      }
    })

    server.events.on('stop', () => {
      server.logger().info('Closing pg connection pool.')
      pool.end()
    })
  }
}
