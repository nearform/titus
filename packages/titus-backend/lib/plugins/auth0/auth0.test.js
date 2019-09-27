'use strict'

const faker = require('faker')
const nock = require('nock')

describe('auth0 plugin', () => {
  let server, address
  const domain = 'https://nf-titus.auth0.com'
  const clientId = faker.random.alphaNumeric(32)
  const clientSecret = faker.random.alphaNumeric(53)
  const audience = 'https://test.auth0.com/api/v2/'
  const grantType = 'client_credentials'

  const username = faker.internet.userName()
  const password = faker.internet.password()

  beforeAll(async () => {
    server = require('fastify')()

    server.register(require('.'), {
      jwt: {
        secret: 'That1Super_Secret'
      }
    })

    server.register(require('./auth0-routes.js'), {
      auth0: {
        domain,
        clientId,
        clientSecret,
        audience,
        grantType
      }
    })

    address = await server.listen(5002)
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
  })

  afterAll(async () => server.close())

  afterEach(nock.cleanAll)

  it('authenticates users', async () => {
    const auth0Response = {
      access_token: faker.random.alphaNumeric(32),
      refresh_token: faker.random.alphaNumeric(32),
      id_token: faker.random.alphaNumeric(32),
      token_type: 'Bearer',
      expires_in: 86400
    }
    nock(domain)
      .post('/oauth/token')
      .reply(200, auth0Response)

    const response = await server.inject({
      method: 'POST',
      url: `${address}/login`,
      payload: {
        username,
        password
      }
    })
    const signed = server.jwt.sign(auth0Response)

    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.payload).token).toEqual(signed)
    expect(nock.isDone()).toEqual(true)
  })

  it('reports authenticate failures', async () => {
    const errorDetails = 'Wrong email or password.'
    nock(domain)
      .post('/oauth/token')
      .reply(403, { error_description: errorDetails })

    const response = await server.inject({
      method: 'POST',
      url: `${address}/login`,
      payload: {
        username,
        password
      }
    })

    expect(response.statusCode).toEqual(403)
    expect(response.payload).toEqual(errorDetails)
  })

  it('reports authenticate failures with http error message', async () => {
    nock(domain)
      .post('/oauth/token')
      .reply(403)

    const response = await server.inject({
      method: 'POST',
      url: `${address}/login`,
      payload: {
        username,
        password
      }
    })

    expect(response.statusCode).toEqual(403)
    expect(response.payload).toEqual('Request failed with status code 403')
  })

  it('should deny anonymous access to protected routes', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `${address}/auth`
    })
    expect(response.statusCode).toEqual(401)
    expect(JSON.parse(response.payload).error).toEqual('Unauthorized')
  })

  it('should deny access with invalid JWT to protected routes', async () => {
    const invalidTokenMsg = 'Authorization token is invalid: jwt malformed'
    const response = await server.inject({
      method: 'GET',
      url: `${address}/auth`,
      headers: { authorization: `Bearer 123456` }
    })

    expect(response.statusCode).toEqual(401)
    expect(JSON.parse(response.payload).message).toEqual(invalidTokenMsg)
  })

  it('should decode valid JWT', async () => {
    const user = { id: 1, name: 'someone' }
    const encoded = server.jwt.sign(user)

    const response = await server.inject({
      method: 'GET',
      url: `${address}/auth`,
      headers: { authorization: `Bearer ${encoded}` }
    })

    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.payload).id).toEqual(user.id)
    expect(JSON.parse(response.payload).name).toEqual(user.name)
  })
})
