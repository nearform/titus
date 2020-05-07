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
    it('returns 404 for root', done => {
      fastify.inject(
        {
          method: 'GET',
          url: '/'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }
          expect(response.statusCode).toEqual(404)
          done()
        }
      )
    })
  })

  describe('/db', () => {
    it('returns a message', done => {
      fastify.inject(
        {
          method: 'GET',
          url: '/db'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }

          expect(response.json()).toEqual({
            message: 'Titus DB manager v1.0.0'
          })

          done()
        }
      )
    })
  })

  describe('/db/seed', () => {
    it('runs seed command in DB', done => {
      fastify.inject(
        {
          method: 'POST',
          url: '/db/seed'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }

          expect(client.connect).toHaveBeenCalled()
          expect(client.end).toHaveBeenCalled()
          expect(response.json()).toEqual({
            success: true
          })

          done()
        }
      )
    })
  })

  describe('/db/truncate', () => {
    it('runs truncate command in DB', done => {
      fastify.inject(
        {
          method: 'POST',
          url: '/db/truncate'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }

          expect(client.connect).toHaveBeenCalled()
          expect(client.end).toHaveBeenCalled()
          expect(response.json()).toEqual({
            success: true
          })

          done()
        }
      )
    })
  })

  describe('/db/migrate', () => {
    it('runs migrate command in DB', done => {
      fastify.inject(
        {
          method: 'POST',
          url: '/db/migrate'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }

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

          done()
        }
      )
    })
  })
})
