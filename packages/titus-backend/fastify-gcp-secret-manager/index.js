'use strict'

const SecretManagerServiceClient = require('@google-cloud/secret-manager')
  .SecretManagerServiceClient
const fp = require('fastify-plugin')
let client

async function accessSecretVersion(name) {
  try {
    const [version] = await client.accessSecretVersion({ name })
    return version.payload.data.toString('utf8')
  } catch (err) {
    // the error message from GCP SDK should get propagated to user as it contain path to the secret, project ID, etc..
    throw new Error(`Secret not found: ${name}`)
  }
}

async function fastifyGCPSecretManager(fastify, options) {
  const name = options.name
  delete options.name

  if (!client) {
    client = new SecretManagerServiceClient()
  }

  const secrets = {}
  for (const key in options) {
    secrets[key] = await accessSecretVersion(options[key])
  }

  if (name) {
    if (!fastify.secrets) {
      fastify.decorate('secrets', {})
    }

    if (fastify.secrets[name]) {
      throw new Error(
        `fastify-gcp-secret-manager '${name}' instance name has already been registered`
      )
    }

    fastify.secrets[name] = secrets
  } else {
    if (fastify.secrets) {
      throw new Error('fastify-gcp-secret-manager has already been registered')
    } else {
      fastify.decorate('secrets', secrets)
    }
  }
}

module.exports = fp(fastifyGCPSecretManager, {
  fastify: '2.x',
  name: 'fastify-gcp-secret-manager'
})
