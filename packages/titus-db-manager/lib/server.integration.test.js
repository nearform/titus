const { Client } = require('pg')
const buildServer = require('./build-server')

describe('Server Integration', () => {
  const fastify = buildServer()
  let client

  beforeAll(async () => {
    client = new Client()
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

  afterAll(async () => {
    await client.end()
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
    it('fails if migration was not run before truncation', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/db/truncate'
      })

      expect(response.json()).toEqual({
        statusCode: 500,
        code: '42P01',
        error: 'Internal Server Error',
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
