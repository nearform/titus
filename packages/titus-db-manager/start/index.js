require('dotenv-expand')(require('dotenv').config())

const Postgrator = require('postgrator')
const { Client } = require('pg')

const Seed = require('../seed')
const Migrate = require('../migrate')
const Truncate = require('../truncate')

const start = async () => {
  console.log(`Starting titus-db-manager tool`)

  const action = process.argv[2] || 'migrate'
  const valid =
    action === 'migrate' || action === 'seed' || action === 'truncate'

  if (!valid) {
    console.log(`${action} is not a valid action, stopping`)
    return
  }

  console.log(`Running: ${action}`)

  try {
    if (action === 'migrate') {
      const pg = await new Postgrator({
        validateChecksums: true,
        newline: 'LF',
        migrationDirectory: `${__dirname}/migrate/migrations`,
        driver: 'pg',
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        schemaTable: `schema_migrations`
      })
      await Migrate(pg)
    } else {
      const client = new Client()
      await client.connect()

      if (action === 'seed') {
        await Seed(client)
      } else if (action === 'truncate') {
        await Truncate(client)
      }

      client.end()
    }
  } catch (err) {
    console.error('An Error has occurred, stopping', err)
    process.exit()
  }
}

module.exports = start
