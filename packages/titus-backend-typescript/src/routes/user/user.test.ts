import fastify, { FastifyInstance } from 'fastify'

import userPlugin from '.'
describe('user route', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = fastify()
    server.register(userPlugin)
    server.addHook('onRequest', async (req) => {
      req.user = { id: 'id-01' }
    })
    await server.ready()
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
    jest.resetAllMocks()
  })

  afterAll(async () => server.close())

  it('should return user', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(JSON.parse(response.payload)).toEqual({ id: 'id-01' })
  })
})
