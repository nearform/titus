const { Client } = require('pg')
const Postgrator = require('postgrator')

const buildServer = require('./build-server')

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn()
  }
  return { Client: jest.fn(() => mClient) }
})

jest.mock('postgrator', () => {
  const mockPostgrator = {
    migrate: jest.fn()
  }
  return jest.fn(() => mockPostgrator)
})

describe('Server', () => {
  let client
  let postgrator
  const fastify = buildServer()

  beforeEach(() => {
    client = new Client()
    postgrator = new Postgrator()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('/', () => {
    it('returns 404 for root', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/'
      })
      expect(response.statusCode).toEqual(404)
    })
  })

  describe('/db', () => {
    it('returns a message', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/db'
      })

      expect(response.json()).toEqual({
        message: 'Titus DB manager v1.0.0'
      })
    })
  })

  describe('/db/seed', () => {
    it('returns an error if something fails', async () => {
      client.connect = jest
        .fn()
        .mockRejectedValueOnce(new Error('Database fails to connect'))

      const response = await fastify.inject({
        method: 'POST',
        url: '/db/seed'
      })

      expect(client.connect).toHaveBeenCalled()
      expect(client.end).toHaveBeenCalled()
      expect(response.json()).toEqual({
        success: false,
        message: 'Database fails to connect'
      })
    })

    it('runs seed command in DB', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/db/seed'
      })

      expect(client.connect).toHaveBeenCalled()
      expect(client.end).toHaveBeenCalled()
      expect(response.json()).toEqual({
        success: true
      })
    })
  })

  describe('/db/truncate', () => {
    it('returns an error if something fails', async () => {
      client.connect = jest
        .fn()
        .mockRejectedValueOnce(new Error('Database fails to connect'))

      const response = await fastify.inject({
        method: 'POST',
        url: '/db/truncate'
      })

      expect(client.connect).toHaveBeenCalled()
      expect(client.end).toHaveBeenCalled()
      expect(response.json()).toEqual({
        success: false,
        message: 'Database fails to connect'
      })
    })

    it('runs truncate command in DB', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/db/truncate'
      })

      expect(client.connect).toHaveBeenCalled()
      expect(client.end).toHaveBeenCalled()
      expect(response.json()).toEqual({
        success: true
      })
    })
  })

  describe('/db/migrate', () => {
    it('returns an error if something fails', async () => {
      postgrator.migrate = jest
        .fn()
        .mockRejectedValueOnce(new Error('Database fails to connect'))

      const response = await fastify.inject({
        method: 'POST',
        url: '/db/migrate'
      })

      expect(Postgrator).toHaveBeenCalledWith(
        expect.objectContaining({
          database: 'titus',
          driver: 'pg',
          host: 'localhost',
          idleTimeoutMillis: 30000,
          newline: 'LF',
          password: 'titus',
          poolSize: 10,
          port: 5432,
          schemaTable: 'schema_migrations',
          user: 'titus',
          validateChecksums: true
        })
      )
      expect(postgrator.migrate).toHaveBeenCalledTimes(1)
      expect(response.json()).toEqual({
        success: false,
        message: 'Database fails to connect'
      })
    })

    it('runs migrate command in DB', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/db/migrate'
      })

      expect(Postgrator).toHaveBeenCalledWith(
        expect.objectContaining({
          database: 'titus',
          driver: 'pg',
          host: 'localhost',
          idleTimeoutMillis: 30000,
          newline: 'LF',
          password: 'titus',
          poolSize: 10,
          port: 5432,
          schemaTable: 'schema_migrations',
          user: 'titus',
          validateChecksums: true
        })
      )
      expect(postgrator.migrate).toHaveBeenCalledTimes(1)
      expect(response.json()).toEqual({
        success: true
      })
    })
  })
})
