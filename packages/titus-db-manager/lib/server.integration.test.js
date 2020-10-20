const { Client } = require('pg')

const buildServer = require('./build-server')
const config = require('./config')

describe('Server Integration', () => {
  let fastify
  let client

  beforeAll(async () => {
    fastify = buildServer()
    await fastify.ready()

    client = new Client({
      ...config.pgPlugin,
      password: fastify.secrets.dbPassword
    })
    await client.connect()
  })

  beforeEach(async () => {
    await client.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;

      GRANT ALL ON SCHEMA public TO titus;
      GRANT ALL ON SCHEMA public TO public;
    `)
  })

  afterAll(() => {
    client.end()
  })

  describe('/db/migrate', () => {
    it('runs migrate command in DB', async () => {
      const result = await fastify.inject({
        method: 'POST',
        url: '/db/migrate'
      })

      expect(result.json()).toEqual({
        success: true
      })
    })
  })

  describe('/db/seed', () => {
    it('runs seed command in DB', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/db/seed'
      })

      expect(response.json()).toEqual({
        success: true
      })
    })
  })

  describe('/db/truncate', () => {
    it('fails if migration did not run before truncation', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/db/truncate'
      })

      expect(response.json()).toEqual({
        success: false,
        message: 'relation "some_table" does not exist'
      })
    })

    it('runs truncate command in DB', async () => {
      await fastify.inject({
        method: 'POST',
        url: '/db/migrate'
      })

      const response = await fastify.inject({
        method: 'POST',
        url: '/db/truncate'
      })

      expect(response.json()).toEqual({
        success: true
      })
    })
  })
})
