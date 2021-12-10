'use strict'

const path = require('path')

const { Client } = require('pg')
const Postgrator = require('postgrator')
const fp = require('fastify-plugin')

const Seed = require('../seed')
const Migrate = require('../migrate')
const Truncate = require('../truncate')
const { version } = require('../package')

const inputSchema = {
  oneOf: [
    { type: 'null' },
    {
      description: 'Optional schema to process',
      type: 'object',
      properties: {
        schema: {
          type: 'string',
          minLength: 1,
          maxLength: 64
        }
      }
    }
  ]
}

const config = require('./config')
async function dbRoutes(server) {
  server.decorateRequest('pgSchema', function pgSchema() {
    return (this.body && this.body.schema) || 'public'
  })

  server.route({
    method: 'POST',
    url: '/db/migrate',
    schema: {
      tags: ['db'],
      body: inputSchema,
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
      const pgSchema = req.pgSchema()
      const postgratorConfig = Object.assign(
        {
          validateChecksums: true,
          newline: 'LF',
          migrationPattern: path.join(
            __dirname,
            '..',
            'migrate',
            'migrations/*.sql'
          ),
          driver: 'pg',
          schemaTable: `${pgSchema}.schema_migrations`,
          currentSchema: pgSchema,
          execQuery: query => client.query(query)
        },
        config.pgPlugin,
        {
          password: server.secrets.dbPassword
        }
      )
      try {
        await client.connect()

        const pg = new Postgrator(postgratorConfig)
        const migrateResult = await Migrate(pg, { logger: req.log })
        return { success: migrateResult }
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
    url: '/db/truncate',
    schema: {
      tags: ['db'],
      body: inputSchema,
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
        await Truncate(client, { schema: req.pgSchema(), logger: req.log })
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
      body: inputSchema,
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
        await Seed(client, { schema: req.pgSchema(), logger: req.log })
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
