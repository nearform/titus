const pino = require('hapi-pino')

module.exports = {
  name: 'titus-loggier',
  register: async (server, options) => {
    await server.register({
      plugin: pino,
      options: {
        prettyPrint: !options.isProduction,
        level: options.logLevel
      }
    })
  }
}
