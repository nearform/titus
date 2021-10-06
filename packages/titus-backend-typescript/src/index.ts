#! /usr/bin/env node

import Fastify from 'fastify'
import closeWithGrace from 'close-with-grace'

import startServer from './server'
import config from './config'

// Crash on unhandledRejection
process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

const main = async () => {
  const server = Fastify(config.fastify)
  server.register(startServer, config)

  const closeListeners = closeWithGrace(
    { delay: 2000 },
    async ({
      signal,
      manual,
      err
    }: {
      signal?
      manual?: any
      err?: Error | undefined
    }) => {
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
