'use strict'

const fp = require('fastify-plugin')

function buildPlugin (Client, pluginOpts) {
  async function FastifySecretsPlugin (fastify, opts = {}) {
    const source = opts.secrets || {}
    const namespace = opts.namespace
    const secrets = {}

    for (const key in source) {
      secrets[key] = await client.get(key)
    }

    if (name) {
      if (!fastify.secrets) {
        fastify.decorate('secrets', {})
      }

      if (fastify.secrets[name]) {
        throw new Error(
          `fastify-secrets '${name}' instance name has already been registered`
        )
      }

      fastify.secrets[name] = secrets
    } else {
      if (fastify.secrets) {
        throw new Error('fastify-secrets has already been registered')
      } else {
        fastify.decorate('secrets', secrets)
      }
    }
  }

  return fb(FastifySecretsPlugin, pluginOpts)
}

module.exports = {
  buildPlugin
}