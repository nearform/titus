const { version } = require('../../../package')

async function plugin(server) {
  server.route({
    method: 'GET',
    url: '/healthcheck',
    handler: async ({ log }) => {
      let dbRes
      try {
        const client = await server.pg.connect()
        dbRes = await client.query('SELECT $1::text as message', [
          'Hello world!'
        ])
      } catch (err) {
        // swallow error
        log.debug({ err }, `failed to read DB during health check`)
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

module.exports = plugin
