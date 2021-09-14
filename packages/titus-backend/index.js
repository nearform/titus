#! /usr/bin/env node

'use strict'

const Fastify = require('fastify')
const closeWithGrace = require('close-with-grace')

const startServer = require('./lib/server')
const config = require('./lib/config')

// Crash on unhandledRejection
process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})

const main = async () => {
  const server = Fastify(config.fastify)
  server.register(startServer, config)

  const closeListeners = closeWithGrace(
    { delay: 2000 },
    async function ({ signal, manual, err }) {
      if (err) {
        server.log.error(err)
      }

      server.log.info({ signal, manual }, 'closing application')

      await server.close()
    }
  )

  server.addHook('onClose', async (instance, done) => {
    closeListeners.uninstall()
    done()
  })

  try {
    await server.listen(config.server)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()
