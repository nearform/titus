'use strict'

const SecretManagerServiceClient = require('@google-cloud/secret-manager')
  .SecretManagerServiceClient
const checkName = require('./checkName')

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

async function fastifyGCPSecretManagerProduction(fastify, options) {
  const { name } = options
  delete options.name
  delete options.developmentSecrets

  if (!client) {
    client = new SecretManagerServiceClient()
  }

  const secrets = {}
  for (const key in options) {
    secrets[key] = await accessSecretVersion(options[key])
  }

  await checkName(fastify, { name, secrets })
}

module.exports = fastifyGCPSecretManagerProduction
