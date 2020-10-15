'use strict'

const fastify = require('fastify')
const jws = require('jws')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const files = require('.')

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
    server.register(files, config)
    server.route({
      handler: async (req, res) => res.send(req.user),
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

  it('should get a user', async () => {
    const userMock = { foo: 'bar' }
    axios.get.mockImplementation(props => {
      return new Promise((resolve, reject) => {
        let response = false
        if (/well-known/.test(props.url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (props.url === 'barfoo') {
          response = { keys: [{ x5t: 234 }] }
        }
        if (/users\/oid1234/.test(props.url)) {
          response = userMock
        }
        return resolve(response)
      })
    })
    axios.post.mockImplementation(props => {
      return new Promise((resolve, reject) => {
        let response = false
        if (/\/tenant\/oauth2/.test(props.url)) {
          response = { access_token: 'foobar123' }
        }
        return resolve(response)
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
    expect(axios.get).toHaveBeenCalledTimes(3)
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).toHaveBeenCalled()
    axios.get.mockClear()
    axios.post.mockClear()
    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })
  it('should get a user, using kid', async () => {
    const userMock = { foo: 'bar' }
    axios.get.mockImplementation(props => {
      return new Promise((resolve, reject) => {
        let response = false
        if (/well-known/.test(props.url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (props.url === 'barfoo') {
          response = { keys: [{ kid: 123 }] }
        }
        if (/users\/oid1234/.test(props.url)) {
          response = userMock
        }
        return resolve(response)
      })
    })
    axios.post.mockImplementation(props => {
      return new Promise((resolve, reject) => {
        let response = false
        if (/\/tenant\/oauth2/.test(props.url)) {
          response = { access_token: 'foobar123' }
        }
        return resolve(response)
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
    expect(axios.get).toHaveBeenCalledTimes(3)
    expect(axios.post).toHaveBeenCalledTimes(1)
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
    expect(axios.get).not.toHaveBeenCalled()
    expect(axios.post).not.toHaveBeenCalled()
    expect(jws.decode).not.toHaveBeenCalled()
    expect(jwt.verify).not.toHaveBeenCalled()
    axios.get.mockClear()
    axios.post.mockClear()
  })
  it('fails, no matching keys', async () => {
    axios.get.mockImplementation((props, cb) => {
      return new Promise((resolve, reject) => {
        let response = false
        if (/well-known/.test(props.url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (props.url === 'barfoo') {
          response = { keys: [{ kid: 123, x5t: 123 }] }
        }
        return resolve(response)
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
    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(axios.post).not.toHaveBeenCalled()
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).not.toHaveBeenCalled()
    axios.get.mockClear()
    axios.post.mockClear()
    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })
  it('fails verification', async () => {
    axios.get.mockImplementation(props => {
      return new Promise((resolve, reject) => {
        let response = false
        if (/well-known/.test(props.url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (props.url === 'barfoo') {
          response = { keys: [{ x5t: 234 }] }
        }
        return resolve(response)
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
    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(axios.post).not.toHaveBeenCalled()
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).toHaveBeenCalled()
    axios.get.mockClear()
    axios.post.mockClear()
    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })
  it('fails, well-known url down', async () => {
    axios.get.mockImplementation((props, cb) => {
      return new Promise((resolve, reject) => {
        let error = null
        if (/well-known/.test(props.url)) {
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
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.post).not.toHaveBeenCalled()
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).not.toHaveBeenCalled()
    axios.get.mockClear()
    axios.post.mockClear()
    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })
  it('fails, graph url down', async () => {
    axios.get.mockImplementation((props, cb) => {
      return new Promise((resolve, reject) => {
        let response = false
        if (/well-known/.test(props.url)) {
          response = {
            id_token_signing_alg_values_supported: ['foobar'],
            jwks_uri: 'barfoo'
          }
        }
        if (props.url === 'barfoo') {
          response = { keys: [{ kid: 123 }] }
        }
        return resolve(response)
      })
    })
    axios.post.mockImplementation((props, cb) => {
      return new Promise((resolve, reject) => {
        return reject(new Error('error'))
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
    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(jws.decode).toHaveBeenCalled()
    expect(jwt.verify).toHaveBeenCalled()
    axios.get.mockClear()
    axios.post.mockClear()
    jwsSpy.mockClear()
    jwtSpy.mockClear()
  })
})
