'use strict'

const startServer = require('./lib/server')
const config = require('./lib/config')
const pg = require('./lib/services/pg')

const main = async () => {
  process.on('unhandledRejection', err => {
    console.error(err)
    process.exit(1)
  })

  const server = require('fastify')(config.fastifyInit)
  server.register(startServer, config)

  const address = await server.listen(config.fastify)
  server.log.info(`Server running at: ${address}`)

  await pg.connect()

  process.on('SIGINT', () => {
    pg.disconnect().then(() => {
      server.close().then(err => {
        process.exit(err ? 1 : 0)
      })
    })
  })
}

main()
