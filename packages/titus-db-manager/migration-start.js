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
  const client = new Client(credentials)
  await client.connect()

  if (action === 'migrate') {
    const pg = await new Postgrator({
      validateChecksums: true,
      newline: 'LF',
      migrationPattern: path.join(__dirname, '/migrate/migrations/*.sql'),
      driver: 'pg',
      ...credentials,
      schemaTable: `schema_migrations`,
      execQuery: query => client.query(query)
    })
    await Migrate(pg)
  } else {
    if (action === 'seed') {
      await Seed(client)
    } else if (action === 'truncate') {
      await Truncate(client)
    }

    await client.end()
  }
}

module.exports = start
