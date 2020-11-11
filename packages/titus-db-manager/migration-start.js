'use strict'

const path = require('path')

const Postgrator = require('postgrator')
const { Client } = require('pg')
const logger = require('pino')()

const Seed = require('./seed')
const Migrate = require('./migrate')
const Truncate = require('./truncate')

const start = async (action, credentials) => {
  logger.info(`Starting titus-db-manager tool`)

  const valid =
    action === 'migrate' || action === 'seed' || action === 'truncate'

  if (!valid) {
    logger.info(`${action} is not a valid action, stopping`)
    return
  }

  logger.info(`Running: ${action}`)

  if (action === 'migrate') {
    const pg = await new Postgrator({
      validateChecksums: true,
      newline: 'LF',
      migrationDirectory: path.join(__dirname, '/migrate/migrations'),
      driver: 'pg',
      ...credentials,
      schemaTable: `schema_migrations`
    })
    await Migrate(pg)
  } else {
    const client = new Client(credentials)
    await client.connect()

    if (action === 'seed') {
      await Seed(client)
    } else if (action === 'truncate') {
      await Truncate(client)
    }

    await client.end()
  }
}

module.exports = start
