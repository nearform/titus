const faker = require('faker')
const nock = require('nock')
const { sign } = require('jsonwebtoken')
const config = require('../../config')

xdescribe('auth0 plugin', () => {
  let server, address
  const domain = 'https://nf-titus.auth0.com'
  const clientId = faker.random.alphaNumeric(32)
  const clientSecret = faker.random.alphaNumeric(53)
  const kid = faker.random.uuid()
  const publicKey = `
MIICsDCCAhmgAwIBAgIJAP0uzO56NPNDMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTYwODAyMTIyMjMyWhcNMTYwOTAxMTIyMjMyWjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKB
gQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvw
UAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03G
UnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQABo4GnMIGkMB0G
A1UdDgQWBBR7ZjPnt+i/E8VUy4tinxi0+H5vbTB1BgNVHSMEbjBsgBR7ZjPnt+i/
E8VUy4tinxi0+H5vbaFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUt
U3RhdGUxITAfBgNVBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAP0uzO56
NPNDMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAnMA5ZAyEQgXrUl6J
T/JFcg6HGXj9yTy71EEMVp3Md3B8WwDvs+di4JFcq8FKSoGtTY4Pb5WE9QVUAmwE
sSQoETNYW3quRmYJCkpIHWnvUW/OAf2/Ejr6zXquhBC6WoCeKQuesMvo2qO1rStC
UWahUh2/RQt9XozEWPWJ9Oe6a7c=`
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kV
w33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4
qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDA
QABAoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6Eb
atXS3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb
6/5CpuGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7
t3Q2OE2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVS
THtrMK0GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jD
M3i1Hp0KSu5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvB
bzPavd4gY6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1d
bOZwJACmH5fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/Sy
SDOxQ4G/523Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDa
bxrE9MNUZ2aPFaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==
-----END RSA PRIVATE KEY-----`
  const username = faker.internet.userName()
  const password = faker.internet.password()

  beforeAll(async () => {
    server = require('fastify')()

    server.register(require('.'), {
      domain,
      clientId,
      clientSecret,
      key: {
        cache: false,
        jwksUri: `${domain}/.well-known/jwks.json`
      }
    })

    // simple protected route returning the authentication details
    server.route({
      method: 'get',
      path: '/protected',
      handler: async ({
        auth: {
          credentials: { payload }
        }
      }) => payload,
      options: { auth: 'jwt' }
    })

    address = await server.listen(config.fastify)
  })

  beforeEach(() => {
    jest.setTimeout(10e4)
  })

  afterAll(async () => server.stop())

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
      .post('/oauth/token', body => {
        expect(body).toEqual({
          grant_type: 'password',
          username,
          password,
          client_id: clientId,
          client_secret: clientSecret
        })
        return true
      })
      .reply(200, auth0Response)

    const response = await server.inject({
      method: 'POST',
      url: `${address}/login`,
      payload: {
        username,
        password
      }
    })

    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.data)).toEqual(auth0Response)
    expect(nock.isDone()).toEqual(true)
  })

  it('reports authenticate failures', async () => {
    const errorDetails = 'Wrong email or password.'
    nock(domain)
      .post('/oauth/token', body => {
        expect(body).toEqual({
          grant_type: 'password',
          username,
          password,
          client_id: clientId,
          client_secret: clientSecret
        })
        return true
      })
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
    expect(JSON.parse(response.payload).message).toEqual(errorDetails)
  })

  it('should deny anonymous access to protected routes', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `${address}/protected`
    })

    expect(response.statusCode).toEqual(401)
    expect(JSON.parse(response.payload).message).toEqual(
      'Missing authentication'
    )
  })

  it('should deny access with invalid JWT to protected routes', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `${address}/protected`,
      headers: { authorization: `Bearer 123456` }
    })

    expect(response.statusCode).toEqual(401)
    expect(JSON.parse(response.payload).message).toEqual('Invalid token format')
  })

  it('should allow access with valid JWT to protected routes', async () => {
    nock(domain)
      .get('/.well-known/jwks.json')
      .reply(200, {
        keys: [
          {
            alg: 'RS256',
            kty: 'RSA',
            use: 'sig',
            x5c: [publicKey],
            kid
          }
        ]
      })
    const tokenPayload = {
      id: faker.random.uuid(),
      name: faker.name.firstName()
    }
    const token = sign(tokenPayload, privateKey, {
      algorithm: 'RS256',
      issuer: `${domain}/`,
      header: { alg: 'RS256', kid }
    })
    const response = await server.inject({
      method: 'GET',
      url: `${address}/protected`,
      headers: { authorization: `Bearer ${token}` }
    })

    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.data)).toEqual(
      expect.objectContaining(tokenPayload)
    )
  })
})
