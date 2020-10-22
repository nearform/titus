'use strict'

const fp = require('fastify-plugin')
const faker = require('faker')

describe('pg plugin', () => {
  let server, address
  const query = 'SELECT table_schema, table_name FROM information_schema.tables'
  const client = {
    query: jest.fn().mockResolvedValue([])
  }
  const STUB_PLUGIN = fp(
    async server => {
      server.decorate('secrets', {
        dbPassword: process.env.PG_PASS
      })
    },
    { name: 'secrets-manager' }
  )

  beforeAll(async () => {
    server = require('fastify')()
    // stub the secrets-manager plugin pg depends on
    server.register(STUB_PLUGIN)
    server.register(require('.'))

    // route that will make DB query
    server.route({
      method: 'GET',
      url: '/query',
      handler: async () => {
        const fakeClient = await server.pg.connect()
        return fakeClient.query(query)
      }
    })

    address = await server.listen(5003)
    server.pg.connect = jest.fn()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  it('should instrument request with fastify-postgres', async () => {
    const result = faker.lorem.word()
    client.query.mockResolvedValue(result)
    server.pg.connect.mockResolvedValue(client)
    const response = await server.inject({
      method: 'GET',
      url: `${address}/query`
    })
    expect(response.statusCode).toEqual(200)
    expect(response.payload).toEqual(result)
    expect(client.query).toHaveBeenNthCalledWith(1, query)
  })
})
