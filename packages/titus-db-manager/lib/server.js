'use strict'

const config = require('./config')
const fastify = require('fastify')({
  logger: true
})
fastify.register(require('./routes'))

// Run the server!
fastify.listen(config.fastify, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
