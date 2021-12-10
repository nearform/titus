'use strict'

const path = require('path')

const Postgrator = require('postgrator')
const { Client } = require('pg')

const seed = require('./seed')
const migrate = require('./migrate')
const truncate = require('./truncate')

const start = async (action, credentials, opts = {}) => {
  const { logger, schema, dir = schema } = opts

  logger.info(`Starting titus-db-manager tool`)

  if (!(action === 'migrate' || action === 'seed' || action === 'truncate')) {
    logger.warn(`${action} is not a valid action, stopping`)
    return
  }

  logger.info(`Running: ${action} on schema '${schema}'`)
  const client = new Client(credentials)
  await client.connect()

  switch (action) {
    case 'migrate': {
      const migrationPattern = path.join(__dirname, 'migrate', dir, '*.sql')
      logger.info(`Running migrations matching ${migrationPattern}`)
      const pg = await new Postgrator({
        validateChecksums: true,
        newline: 'LF',
        migrationPattern,
        driver: 'pg',
        schemaTable: `${schema}.schema_migrations`,
        currentSchema: schema,
        execQuery: query => client.query(query)
      })
      await migrate(pg, opts)
      break
    }
    case 'seed': {
      await seed(client, opts)
      break
    }
    case 'truncate': {
      await truncate(client, opts)
    }
  }

  await client.end()
}

module.exports = start
