'use strict'

const path = require('path')
const { Client } = require('pg')
const Postgrator = require('postgrator')

const config = require('./config')
const Seed = require('../seed')
const Migrate = require('../migrate')
const Truncate = require('../truncate')

const { version } = require('../package')
const fp = require('fastify-plugin')
async function dbRoutes(server) {
  server.route({
    method: 'POST',
    url: '/db/migrate',
    schema: {
      tags: ['db'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            success: { type: 'boolean' }
          }
        }
      }
    },
    handler: async () => {
      const postgratorConfig = Object.assign(
        {
          validateChecksums: true,
          newline: 'LF',
          migrationDirectory: path.join(
            __dirname,
            '..',
            'migrate',
            'migrations'
          ),
          driver: 'pg',
          schemaTable: `schema_migrations`
        },
        config.pgPlugin
      )
      const pg = await new Postgrator(postgratorConfig)
      const migrateResult = await Migrate(pg)
      return { success: migrateResult }
    }
  })

  server.route({
    method: 'POST',
    url: '/db/truncate',
    schema: {
      tags: ['db'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            success: { type: 'boolean' }
          }
        }
      }
    },
    handler: async () => {
      const client = new Client(config.pgPlugin)
      await client.connect()
      await Truncate(client)
      client.end()
      return { success: true }
    }
  })

  server.route({
    method: 'POST',
    url: '/db/seed',
    schema: {
      tags: ['db'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            success: { type: 'boolean' }
          }
        }
      }
    },
    handler: async () => {
      const client = new Client(config.pgPlugin)
      await client.connect()
      await Seed(client)
      client.end()
      return { success: true }
    }
  })

  server.route({
    method: 'GET',
    url: '/db',
    schema: {
      tags: ['db'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: async () => {
      return {
        message: `Titus DB manager v${version}`
      }
    }
  })
}

module.exports = fp(dbRoutes)
