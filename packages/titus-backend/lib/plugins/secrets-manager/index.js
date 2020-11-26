'use strict'

const fp = require('fastify-plugin')
const SECRETS_PLUGINS = {
  gcp: require('fastify-secrets-gcp'),
  aws: require('fastify-secrets-aws'),
  env: require('fastify-secrets-env')
}

function getPlugin(options) {
  if (!options.secretsManager.strategy) {
    return SECRETS_PLUGINS.env
  }

  return SECRETS_PLUGINS[options.secretsManager.strategy]
}

async function secretsManager(server, options) {
  const plugin = getPlugin(options)
  if (!plugin) {
    throw new Error(
      `Invalid secrets manager strategy. Choose one of ${Object.keys(
        SECRETS_PLUGINS
      ).join(', ')}`
    )
  }
  server.register(plugin, options.secretsManager)
}

module.exports = fp(secretsManager, {
  name: 'secrets-manager'
})
