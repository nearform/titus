'use strict'
const fp = require('fastify-plugin')

async function fastifySecretsEnv(fastify, options) {
  const { name, developmentSecrets, ...restOptions } = options

  const secrets = {}
  for (const key in restOptions) {
    if (developmentSecrets[key]) {
      secrets[key] = developmentSecrets[key]
    } else {
      // if development secret is not set it will throw an error
      throw new Error(`Development secret not found: ${key}`)
    }
  }

  if (name) {
    if (!fastify.secrets) {
      fastify.decorate('secrets', {})
    }

    if (fastify.secrets[name]) {
      throw new Error(
        `fastify-secrets-env '${name}' instance name has already been registered`
      )
    }

    fastify.secrets[name] = secrets
  } else {
    if (fastify.secrets) {
      throw new Error('fastify-secrets-env has already been registered')
    } else {
      fastify.decorate('secrets', secrets)
    }
  }
}

module.exports = fp(fastifySecretsEnv, {
  fastify: '2.x',
  name: 'fastify-secrets-env'
})
