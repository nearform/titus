import fastify from 'fastify'
import jws from 'jws'
import jwt from 'jsonwebtoken'
import axios from 'axios'

import files from '.'

jest.mock('jsonwebtoken')
jest.mock('jwk-to-pem')
jest.mock('jws')
jest.mock('axios')

describe('users plugin', () => {
  let server

  beforeAll(async () => {
    server = fastify()
    const config = {
      auth: {
        provider: 'azureAD',
        azureAD: {
          appID: 'appID',
          secret: 'secret',
          tenant: 'tenant'
        }
      }
    }
    await server.register(files, config)
    server.route({
      onRequest: [server.authenticate],
      handler: async ({ user }, res) => res.send(user),
      method: 'GET',
      url: '/user'
    })
    server.route({
      handler: async (req, res) => res.send({ foo: 'bar' }),
      method: 'GET',
      url: '/test'
    })
    await server.ready()
  })

  afterAll(async () => server.close())

  beforeEach(() => {
    axios.mockClear()
  })

  it('should get a user', async () => {
    const userMock = { foo: 'bar' }

    axios.mockImplementation((props) => {
      const url = typeof props === 'string' ? props : props.url

      return new Promise((resolve) => {
        let response = false

        if (/well-known/.test(url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (url === 'barfoo') {
          response = { keys: [{ x5t: 234 }] }
        }
        if (/users\/oid1234/.test(url)) {
          response = userMock
        }

        if (/\/tenant\/oauth2/.test(url)) {
          response = { access_token: 'foobar123' }
        }

        return resolve({ data: response })
      })
    })

    const jwsSpy = jest
      .spyOn(jws, 'decode')
      .mockReturnValue({ header: { x5t: 234 } })

    const jwtMock = { oid: 'oid1234' }

    const jwtSpy = jest
      .spyOn(jwt, 'verify')
      .mockImplementation((token, pem, props, cb) => cb(null, jwtMock))

    const response = await server.inject({
      headers: { Authorization: 'Bearer 123foobar' },
      method: 'GET',
      url: '/user'
    })

    expect(JSON.parse(response.body)).toEqual(userMock)
    expect(axios).toHaveBeenCalledTimes(4)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).toHaveBeenCalled()

    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })

  it('should get a user, using kid', async () => {
    const userMock = { foo: 'bar' }
    axios.mockImplementation((props) => {
      const url = typeof props === 'string' ? props : props.url

      return new Promise((resolve) => {
        let response = false
        if (/well-known/.test(url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (url === 'barfoo') {
          response = { keys: [{ kid: 123 }] }
        }
        if (/users\/oid1234/.test(url)) {
          response = userMock
        }
        if (/\/tenant\/oauth2/.test(url)) {
          response = { access_token: 'foobar123' }
        }
        return resolve({ data: response })
      })
    })
    const jwsSpy = jest
      .spyOn(jws, 'decode')
      .mockReturnValue({ header: { kid: 123 } })
    const jwtMock = { oid: 'oid1234' }
    const jwtSpy = jest
      .spyOn(jwt, 'verify')
      .mockImplementation((token, pem, props, cb) => cb(null, jwtMock))

    const response = await server.inject({
      headers: { Authorization: 'Bearer 123foobar' },
      method: 'GET',
      url: '/user'
    })

    expect(JSON.parse(response.body)).toEqual(userMock)
    expect(axios).toHaveBeenCalledTimes(4)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).toHaveBeenCalled()
    axios.get.mockClear()
    axios.post.mockClear()
    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })

  it('does not authenticate', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/test'
    })

    expect(JSON.parse(response.body)).toEqual({ foo: 'bar' })
    expect(axios).not.toHaveBeenCalled()
    expect(jws.decode).not.toHaveBeenCalled()
    expect(jwt.verify).not.toHaveBeenCalled()
  })

  it('fails, no matching keys', async () => {
    axios.mockImplementation((props) => {
      const url = typeof props === 'string' ? props : props.url

      return new Promise((resolve) => {
        let response = false
        if (/well-known/.test(url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (url === 'barfoo') {
          response = { keys: [{ kid: 123, x5t: 123 }] }
        }
        return resolve({ data: response })
      })
    })

    const jwsSpy = jest
      .spyOn(jws, 'decode')
      .mockReturnValue({ header: { kid: 123, x5t: 234 } })
    const jwtSpy = jest.spyOn(jwt, 'verify')

    const response = await server.inject({
      headers: { Authorization: 'Bearer 123foobar' },
      method: 'GET',
      url: '/user'
    })

    const parsedResponse = JSON.parse(response.body)
    expect(parsedResponse.statusCode).toEqual(400)
    expect(axios).toHaveBeenCalledTimes(2)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).not.toHaveBeenCalled()

    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })

  it('fails verification', async () => {
    axios.mockImplementation((props) => {
      const url = typeof props === 'string' ? props : props.url

      return new Promise((resolve) => {
        let response = false
        if (/well-known/.test(url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (url === 'barfoo') {
          response = { keys: [{ x5t: 234 }] }
        }
        return resolve({ data: response })
      })
    })

    const jwsSpy = jest
      .spyOn(jws, 'decode')
      .mockReturnValue({ header: { x5t: 234 } })
    const jwtSpy = jest
      .spyOn(jwt, 'verify')
      .mockImplementation((token, pem, props, cb) => cb(new Error('error')))

    const response = await server.inject({
      headers: { Authorization: 'Bearer 123foobar' },
      method: 'GET',
      url: '/user'
    })

    const parsedResponse = JSON.parse(response.body)
    expect(parsedResponse.statusCode).toEqual(400)
    expect(axios).toHaveBeenCalledTimes(2)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).toHaveBeenCalled()

    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })

  it('fails, well-known url down', async () => {
    axios.mockImplementation((props) => {
      const url = typeof props === 'string' ? props : props.url

      return new Promise((resolve, reject) => {
        let error = null
        if (/well-known/.test(url)) {
          error = new Error('error')
        }
        return reject(error)
      })
    })
    const jwsSpy = jest
      .spyOn(jws, 'decode')
      .mockReturnValue({ header: { kid: 123, x5t: 234 } })
    const jwtSpy = jest.spyOn(jwt, 'verify')

    const response = await server.inject({
      headers: { Authorization: 'Bearer 123foobar' },
      method: 'GET',
      url: '/user'
    })

    const parsedResponse = JSON.parse(response.body)
    expect(parsedResponse.statusCode).toEqual(400)
    expect(axios).toHaveBeenCalledTimes(1)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).not.toHaveBeenCalled()

    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })

  it('fails, graph url down', async () => {
    axios.mockImplementation((props) => {
      const url = typeof props === 'string' ? props : props.url

      return new Promise((resolve, reject) => {
        if (/graph.microsoft.com/.test(url)) {
          return reject(new Error('errorr'))
        }

        let response = false
        if (/well-known/.test(url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (url === 'barfoo') {
          response = { keys: [{ kid: 123 }] }
        }
        return resolve({ data: response })
      })
    })
    const jwsSpy = jest
      .spyOn(jws, 'decode')
      .mockReturnValue({ header: { kid: 123 } })
    const jwtMock = { oid: 'oid1234' }
    const jwtSpy = jest
      .spyOn(jwt, 'verify')
      .mockImplementation((token, pem, props, cb) => cb(null, jwtMock))

    const response = await server.inject({
      headers: { Authorization: 'Bearer 123foobar' },
      method: 'GET',
      url: '/user'
    })

    const parsedResponse = JSON.parse(response.body)
    expect(parsedResponse.statusCode).toEqual(400)
    expect(axios).toHaveBeenCalledTimes(4)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).toHaveBeenCalled()

    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })
})
