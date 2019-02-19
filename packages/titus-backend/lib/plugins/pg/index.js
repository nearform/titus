const PgPool = require('pg-pool')
require('pg-range').install(require('pg'))

const pluginName = 'pgPlugin'

const isTransactional = request => {
  const pluginOpts = request.route.settings.plugins[pluginName] || {}
  return !!pluginOpts.transactional
}

module.exports = {
  name: pluginName,
  /**
   * Registers Postgres connection management plugin.
   * It will attach a pg object to routes for them to issue queries against database.
   * Also automatically commit (or rollback, in case of thrown errors) transactionnal routes.
   *
   * To enable it, include `plugins: { pgPlugin: {} }` to your route `options`
   * To enable transactional support: `plugins: { pgPlugin: { transactional: true } }`
   * @async
   * @param {Hapi.Server} server  - in which stratgy and routes are registered
   * @param {Object} options      - pg-pool options
   * @see https://github.com/brianc/node-pg-pool#create
   */
  register: async (server, options) => {
    const pool = new PgPool(options)

    server.ext({
      type: 'onPreHandler',
      method: async (request, h) => {
        const { route, logger } = request
        if (!route.settings.plugins[pluginName]) {
          return h.continue
        }

        logger.debug('Getting database connection')
        request.pg = await pool.connect()

        if (isTransactional(request)) {
          logger.debug('Begin transaction')
          await request.pg.query('BEGIN')
        }
        return h.continue
      }
    })

    server.events.on('response', async request => {
      const { pg, response, logger } = request
      if (pg) {
        if (isTransactional(request)) {
          const error =
            response &&
            (response.statusCode !== 200 ||
              (response.source && response.source.error))

          const action = error ? 'ROLLBACK' : 'COMMIT'
          logger.debug(action)
          try {
            await pg.query(action)
          } catch (e) {
            logger.error(e)
          }
        }

        logger.debug('Returning database connection.')
        try {
          await pg.release()
        } catch (e) {
          logger.error(e)
        }
      }
    })

    server.events.on('stop', () => {
      server.logger().info('Closing pg connection pool.')
      pool.end()
    })
  }
}
