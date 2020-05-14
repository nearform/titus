'use strict'

const checkName = require('./checkName')

async function fastifyGCPSecretManagerDevelopment(fastify, options) {
  const { name, developmentSecrets } = options
  delete options.name
  delete options.developmentSecrets

  const secrets = {}
  for (const key in options) {
    if (developmentSecrets[key]) {
      secrets[key] = developmentSecrets[key]
    } else {
      // if development secret is not set it will throw an error
      throw new Error(`Development secret not found: ${key}`)
    }
  }

  await checkName(fastify, { name, secrets })
}

module.exports = fastifyGCPSecretManagerDevelopment
