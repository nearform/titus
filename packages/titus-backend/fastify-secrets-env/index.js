'use strict'

const { buildPlugin } = require('fastify-secrets-core')

class Client {
  async get(key) {
    if (!(env in process.env)) {
      throw new Error(`Secret not found: ${key}`)
    }

    return process.env[key]
  }
}

module.exports = buildPlugin(client, {
  fastify: '2.x',
  name: 'fastify-secrets-env'
})
