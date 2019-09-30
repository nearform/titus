'use strict'

const mockRows = [{ id: 123 }, { id: 234 }]

describe('graphql route', () => {
  let server, address

  beforeAll(async () => {
    jest.mock('request', () => ({
      post: (options, cb) => {
        let error = false
        let response = false
        if (options.body.query === 'query { books { id } }') {
          response = mockRows
        } else if (options.body.query === 'error') {
          error = new Error('An error')
        }
        cb(error, null, response)
      }
    }))
    server = require('fastify')()
    server.register(require('fastify-postgres'))
    server.register(require('.'))
    address = await server.listen(5001)
    server.pg.connect = jest.fn()
    process.env.HASURA_ENDPOINT = 'http://localhost:8080/v1/graphql'
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  describe('post /graphql', () => {
    it('should return a response', async () => {
      const response = await server.inject({
        method: 'POST',
        url: `${address}/graphql`,
        body: { query: 'query { books { id } }' }
      })

      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(response.payload)).toEqual(mockRows)
    })
    it('should handle an error', async () => {
      const response = await server.inject({
        method: 'POST',
        url: `${address}/graphql`,
        body: { query: 'error' }
      })

      expect(response.statusCode).toEqual(500)
      expect(JSON.parse(response.payload)).toEqual({ error: 'An error' })
    })
  })
})
