'use strict'

const config = require('../config/default')

// const graphqlSchema = require('./graphql').schema
// const loaders = require('./graphql').loaders
// const pgPlugin = require('./pg-plugin')
const Fastify = require('fastify')

const server = Fastify({
  logger: config.logger.pino
})

const init = async () => {
  // Declare a route
  server.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  // Run the server!
  const start = async () => {
    try {
      await server.listen(config.fastify.port, config.fastify.host)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }
  return start()
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

// process.on('SIGINT', () => {
//   // TODO graceful server stop with kill on timeout (10s)
// })

module.exports = init
