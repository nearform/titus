const axios = require('axios')
const hapi = require('hapi')
const { version } = require('../../../package')

describe('health route', () => {
  let server
  const pg = {
    query: jest.fn().mockResolvedValue([]),
    release: jest.fn()
  }
  // by convention, has to start with 'mock' so Jest could is it
  const mockConnect = jest.fn()

  beforeAll(async () => {
    jest.mock('pg-pool', () =>
      jest.fn().mockImplementation(() => ({ connect: mockConnect }))
    )

    server = hapi.server()
    await server.register([
      {
        plugin: require('../../plugins/logger'),
        options: { logLevel: 'silent' }
      },
      require('../../plugins/pg'),
      require('.')
    ])
    await server.start()
  })

  beforeEach(() => {
    jest.resetAllMocks()
    mockConnect.mockResolvedValue(pg)
  })

  afterAll(async () => server.stop())

  it('should return server health with DB check', async () => {
    pg.query.mockResolvedValue({ rowCount: 1 })

    const response = await axios.get(`${server.info.uri}/healthcheck`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(
      expect.objectContaining({
        db: 'ok',
        serverTimestamp: expect.any(String),
        status: 'ok',
        version
      })
    )
    expect(pg.query).toHaveBeenCalledWith('SELECT $1::text as message', [
      'Hello world!'
    ])
  })

  it('should report failure on DB error', async () => {
    pg.query.mockRejectedValue(new Error('boom!'))

    const response = await axios.get(`${server.info.uri}/healthcheck`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(
      expect.objectContaining({
        db: 'fail',
        serverTimestamp: expect.any(String),
        status: 'ok',
        version
      })
    )
  })

  it('should report failure on empty DB response', async () => {
    pg.query.mockResolvedValue({})

    const response = await axios.get(`${server.info.uri}/healthcheck`)
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(
      expect.objectContaining({
        db: 'fail',
        serverTimestamp: expect.any(String),
        status: 'ok',
        version
      })
    )
  })
})
