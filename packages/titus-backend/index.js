#! /usr/bin/env node

'use strict'

const fastify = require('fastify')
const helmet = require('fastify-helmet')

const startServer = require('./lib/server')
const config = require('./lib/config')

// Crash on unhandledRejection
process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})

const main = async () => {
  const server = fastify(config.fastify)
  server.register(helmet)
  server.register(startServer, config)

  await server.listen(config.server)

  for (const signal of ['SIGINT', 'SIGTERM']) {
    // Use once so that double signals are handled.
    process.once(signal, () => {
      server.log.info({ signal }, 'closing application')
      server
        .close()
        .then(() => {
          server.log.info({ signal }, 'application closed')
          process.exit(0)
        })
        .catch(err => {
          server.log.error({ err }, 'Error closing the application')
          process.exit(1)
        })
    })
  }
}

main()
