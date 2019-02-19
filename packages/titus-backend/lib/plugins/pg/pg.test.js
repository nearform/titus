const axios = require('axios')
const hapi = require('hapi')
const faker = require('faker')
const pino = require('hapi-pino')
const { badRequest } = require('boom')

describe('pg plugin', () => {
  let server
  const pg = {
    query: jest.fn().mockResolvedValue([]),
    release: jest.fn()
  }
  // by convention, has to start with 'mock' so Jest could is it
  const mockConnect = jest.fn()
  const query = 'SELECT table_schema, table_name FROM information_schema.tables'

  beforeAll(async () => {
    jest.mock('pg-pool', () =>
      jest.fn().mockImplementation(() => ({ connect: mockConnect }))
    )

    server = hapi.server()
    await server.register([
      {
        plugin: pino,
        options: { level: 'silent' }
      },
      require('.')
    ])

    // regular route with no use of DB
    server.route({
      method: 'get',
      path: '/regular',
      handler: req => req.pg !== undefined
    })

    // route that will make DB query
    server.route({
      method: 'get',
      path: '/query',
      handler: async req => req.pg.query(query),
      options: { plugins: { pgPlugin: {} } }
    })

    // route with transactional support
    server.route({
      method: 'get',
      path: '/transactional',
      handler: async req => req.pg.query(query),
      options: { plugins: { pgPlugin: { transactional: true } } }
    })

    // route with transactional support throwing errors
    server.route({
      method: 'get',
      path: '/transactional-error',
      handler: async req => {
        throw badRequest('failed!')
      },
      options: { plugins: { pgPlugin: { transactional: true } } }
    })

    await server.start()
  })

  beforeEach(() => {
    jest.resetAllMocks()
    mockConnect.mockResolvedValue(pg)
  })

  afterAll(async () => server.stop())

  it('should not instrument request if not needed', async () => {
    const response = await axios.get(`${server.info.uri}/regular`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(false)
    expect(pg.query).not.toHaveBeenCalled()
    expect(pg.release).not.toHaveBeenCalled()
  })

  it('should instrument request with postgress toolkit', async () => {
    const result = faker.lorem.word()
    pg.query.mockResolvedValue(result)
    const response = await axios.get(`${server.info.uri}/query`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(result)
    expect(pg.query).toHaveBeenNthCalledWith(1, query)
    expect(pg.release).toHaveBeenCalledTimes(1)
  })

  it('should handle rlease error on response end', async () => {
    const result = faker.lorem.word()
    pg.query.mockResolvedValue(result)
    pg.release.mockRejectedValue(new Error('boom!'))
    const response = await axios.get(`${server.info.uri}/query`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(result)
    expect(pg.query).toHaveBeenNthCalledWith(1, query)
    expect(pg.release).toHaveBeenCalledTimes(1)
  })

  it('should open and close transaction on request', async () => {
    const result = faker.lorem.word()
    pg.query.mockResolvedValue(result)
    const response = await axios.get(`${server.info.uri}/transactional`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(result)
    expect(pg.query).toHaveBeenNthCalledWith(1, 'BEGIN')
    expect(pg.query).toHaveBeenNthCalledWith(2, query)
    expect(pg.query).toHaveBeenNthCalledWith(3, 'COMMIT')
    expect(pg.release).toHaveBeenCalledTimes(1)
  })

  it('should handle commit error on response end', async () => {
    const result = faker.lorem.word()
    pg.query
      .mockResolvedValueOnce()
      .mockResolvedValueOnce(result)
      .mockRejectedValueOnce(new Error('boom!'))
    const response = await axios.get(`${server.info.uri}/transactional`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(result)
    expect(pg.query).toHaveBeenNthCalledWith(1, 'BEGIN')
    expect(pg.query).toHaveBeenNthCalledWith(2, query)
    expect(pg.query).toHaveBeenNthCalledWith(3, 'COMMIT')
    expect(pg.release).toHaveBeenCalledTimes(1)
  })

  it('should rollback on thrown error', async () => {
    const response = await axios.get(`${server.info.uri}/transactional-error`, {
      validateStatus: () => true
    })
    expect(response.status).toEqual(400)
    expect(pg.query).toHaveBeenNthCalledWith(1, 'BEGIN')
    expect(pg.query).toHaveBeenNthCalledWith(2, 'ROLLBACK')
    expect(pg.release).toHaveBeenCalledTimes(1)
  })
})
