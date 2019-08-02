const config = require('../../config')
const faker = require('faker')

describe('pg plugin', () => {
  let server, address
  const query = 'SELECT table_schema, table_name FROM information_schema.tables'
  const client = {
    query: jest.fn().mockResolvedValue([])
  }

  beforeAll(async () => {
    server = require('fastify')()
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

    address = await server.listen(config.fastify)
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
