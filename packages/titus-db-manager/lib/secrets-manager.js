'use strict'

const fp = require('fastify-plugin')
const SECRETS_PLUGINS = {
  gcp: require('fastify-secrets-gcp'),
  aws: require('fastify-secrets-aws'),
  env: require('fastify-secrets-env'),
  azure: require('fastify-secrets-azure')
}

const config = require('./config')

function getPlugin() {
  if (!config.secretsManager.strategy) {
    return SECRETS_PLUGINS.env
  }

  return SECRETS_PLUGINS[config.secretsManager.strategy]
}

async function secretsManager(server) {
  const plugin = getPlugin()
  if (!plugin) {
    throw new Error(
      `Invalid secrets manager strategy. Choose one of ${Object.keys(
        SECRETS_PLUGINS
      ).join(', ')}`
    )
  }

  if (options.secretsManager.strategy === 'azure') {
    // add required options
    const [vaultName, secretName] =
      options.secretsManager.secrets.dbPassword.split('|')
    options.secretsManager.secrets.dbPassword = secretName
    options.secretsManager.clientOptions = { vaultName }
    console.log(options.secretsManager)
  }
  server.register(plugin, config.secretsManager)
}

module.exports = fp(secretsManager, {
  name: 'secrets-manager'
})
