'use strict'

const { Client } = require('pg')
const Postgrator = require('postgrator')

const Seed = require('../seed')
const Migrate = require('../migrate')
const Truncate = require('../truncate')

const fastify = require('fastify')({
  logger: true
})
const PORT = 3002

fastify.post('/migrate', async (request, reply) => {
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
  const migrateResult = await Migrate(pg)

  if (migrateResult) {
    return reply({ success: true })
  }
  return reply({ success: false })
})

fastify.post('/truncate', async (request, reply) => {
  const client = new Client()
  await client.connect()
  await Truncate(client)
  client.end()
  return reply({ success: true })
})

fastify.post('/seed', async (request, reply) => {
  const client = new Client()
  await client.connect()
  await Seed(client)
  client.end()
  return reply({ success: true })
})

// Run the server!
fastify.listen(PORT, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
