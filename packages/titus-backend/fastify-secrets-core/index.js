'use strict'

const fp = require('fastify-plugin')

function buildPlugin(Client, pluginOpts) {
  async function FastifySecretsPlugin(fastify, opts = {}) {
    const source = opts.secrets || {}
    const namespace = opts.namespace
    const secrets = {}

    const client = new Client()

    for (const key in source) {
      secrets[key] = await client.get(source[key])
    }

    if (namespace) {
      if (!fastify.secrets) {
        fastify.decorate('secrets', {})
      }

      if (fastify.secrets[namespace]) {
        throw new Error(
          `fastify-secrets '${namespace}' instance name has already been registered`
        )
      }

      fastify.secrets[namespace] = secrets
    } else {
      if (fastify.secrets) {
        throw new Error('fastify-secrets has already been registered')
      } else {
        fastify.decorate('secrets', secrets)
      }
    }
  }

  return fp(FastifySecretsPlugin, {
    fastify: '>= 2.x',
    ...pluginOpts
  })
}

module.exports = {
  buildPlugin
}
