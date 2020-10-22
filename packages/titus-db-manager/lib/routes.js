'use strict'

const path = require('path')

const { Client } = require('pg')
const Postgrator = require('postgrator')
const fp = require('fastify-plugin')

const Seed = require('../seed')
const Migrate = require('../migrate')
const Truncate = require('../truncate')
const { version } = require('../package')

const config = require('./config')
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
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    },
    handler: async req => {
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
        config.pgPlugin,
        {
          password: server.secrets.dbPassword
        }
      )
      try {
        const pg = new Postgrator(postgratorConfig)
        const migrateResult = await Migrate(pg)
        return { success: migrateResult }
      } catch (e) {
        req.log.error({ err: e })
        return { success: false, message: e.message }
      }
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
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    },
    handler: async req => {
      const client = new Client({
        ...config.pgPlugin,
        password: server.secrets.dbPassword
      })
      try {
        await client.connect()
        await Truncate(client)
        return { success: true }
      } catch (e) {
        req.log.error({ err: e })
        return { success: false, message: e.message }
      } finally {
        client.end()
      }
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
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    },
    handler: async req => {
      const client = new Client({
        ...config.pgPlugin,
        password: server.secrets.dbPassword
      })
      try {
        await client.connect()
        await Seed(client)
        return { success: true }
      } catch (e) {
        req.log.error({ err: e })
        return { success: false, message: e.message }
      } finally {
        client.end()
      }
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
