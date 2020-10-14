'use strict'

const { buildPlugin } = require('fastify-secrets-core')

class Client {
  async get(key) {
    if (!(key in process.env)) {
      throw new Error(`Secret not found: ${key}`)
    }

    return process.env[key]
  }
}

module.exports = buildPlugin(Client, {
  name: 'fastify-secrets-env'
})
