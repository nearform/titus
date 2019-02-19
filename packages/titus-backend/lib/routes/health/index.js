const { version } = require('../../../package')

module.exports = {
  name: 'health-route',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/healthcheck',
      config: {
        plugins: { pgPlugin: {} }
      },
      handler: async request => {
        let dbRes
        try {
          dbRes = await request.pg.query('SELECT $1::text as message', [
            'Hello world!'
          ])
        } catch (err) {
          // swallow error
          server
            .logger()
            .debug({ err }, `failed to read DB during health check`)
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
