const { version } = require('../../../package')

module.exports = {
  name: 'healthRoute',
  /**
   * Registers health check route, issuing database dummy query to check its availability
   * @async
   * @param {Hapi.Server} server  - in which stratgy and routes are registered
   */
  register: async server => {
    server.route({
      method: 'GET',
      path: '/healthcheck',
      config: {
        plugins: { pgPlugin: {} }
      },
      handler: async ({ pg, logger }) => {
        let dbRes
        try {
          dbRes = await pg.query('SELECT $1::text as message', ['Hello world!'])
        } catch (err) {
          // swallow error
          logger.debug({ err }, `failed to read DB during health check`)
        }
        return {
          version,
          serverTimestamp: new Date(),
          status: 'ok',
          db: dbRes && dbRes.rowCount === 1 ? 'ok' : 'fail'
        }
      }
    })
  }
}
