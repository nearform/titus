'use strict'

require('dotenv-expand')(require('dotenv').config())
const logger = require('pino')()
const { Client: ClientGcp } = require('fastify-secrets-gcp')
const { Client: ClientAws } = require('fastify-secrets-aws')
const { Client: ClientEnv } = require('fastify-secrets-env')

const start = require('./migration-start')

function getClient() {
  if (!process.env.SECRETS_STRATEGY || process.env.SECRETS_STRATEGY === 'env') {
    return new ClientEnv()
  }

  if (process.env.SECRETS_STRATEGY === 'gcp') {
    return new ClientGcp()
  }

  if (process.env.SECRETS_STRATEGY === 'aws') {
    return new ClientAws()
  }

  throw new Error('Unsupported secrets manager strategy')
}

async function run() {
  try {
    const client = getClient()
    const password = await client.get(process.env.SECRETS_PG_PASS)

    const credentials = {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password
    }

    await start(process.argv[2] || 'migrate', credentials)
  } catch (err) {
    logger.error('An Error has occurred, stopping', err)
    process.exit(1)
  }
}

run()
