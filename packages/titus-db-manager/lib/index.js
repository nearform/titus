'use strict'

const config = require('./config')
const buildServer = require('./build-server')

const server = buildServer()

// Run the server!
server.listen(config.fastify, (err, address) => {
  if (err) throw err
  server.log.info(`server listening on ${address}`)
})
