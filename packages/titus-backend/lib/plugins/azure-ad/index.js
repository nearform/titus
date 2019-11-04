'use strict'

const fp = require('fastify-plugin')
const jwkToPem = require('jwk-to-pem')
const jws = require('jws')
const jwt = require('jsonwebtoken')
const request = require('request')

const authRoutes = require('../../config/auth-routes')

const get = options =>
  new Promise((resolve, reject) => {
    request.get(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }
      return resolve(body)
    })
  })

const post = options =>
  new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }
      return resolve(body)
    })
  })

const verifyJWT = async (config, idToken) => {
  const decoded = jws.decode(idToken)
  const identityMetadataURL = [
    'https://login.microsoftonline.com/',
    config.tenant,
    '/v2.0/.well-known/openid-configuration'
  ].join('')
  const metadata = await get({ json: true, url: identityMetadataURL })
  const {
    id_token_signing_alg_values_supported: algorithms,
    jwks_uri: jwksUri
  } = metadata
  const body = await get({ json: true, url: jwksUri })
  let findBy = 'x5t'
  if (!decoded.header.x5t) {
    findBy = 'kid'
  }
  const key = body.keys.find(k => k[findBy] === decoded.header[findBy])
  if (!key) {
    throw new Error('No matching key')
  }
  const pem = jwkToPem(key)
  const props = { algorithms }
  return new Promise((resolve, reject) => {
    jwt.verify(idToken, pem, props, (error, token) => {
      if (error) {
        return reject(error)
      }
      return resolve(token)
    })
  })
}

const getUser = async (config, token, cb) => {
  const tokenURL = [
    'https://login.microsoftonline.com/',
    config.tenant,
    '/oauth2/v2.0/token'
  ].join('')
  const body = await post({
    json: true,
    url: tokenURL,
    form: {
      client_id: config.appID,
      client_secret: config.secret,
      grant_type: 'client_credentials',
      scope: 'https://graph.microsoft.com/.default'
    }
  })
  const userProperties = [
    'accountEnabled',
    'givenName',
    'id',
    'mobilePhone',
    'otherMails',
    'surname',
    'userPrincipalName'
  ]
  const userURL = [
    'https://graph.microsoft.com/v1.0/users/',
    token.oid,
    `?$select=${userProperties.join(',')}`
  ].join('')
  return get({
    auth: { bearer: body.access_token },
    json: true,
    url: userURL
  })
}

async function azureAD(server, options) {
  server.addHook('onRequest', async (req, res) => {
    const {
      headers: { authorization = '' },
      method,
      originalUrl
    } = req.raw
    const authRoute = authRoutes.find(
      r => r.method === method && r.regex.test(originalUrl)
    )
    if (!authRoute) {
      return true
    }
    const token = authorization.replace('Bearer ', '')
    try {
      const verifiedToken = await verifyJWT(options.azureAD, token)
      const user = await getUser(options.azureAD, verifiedToken)
      req.user = user
    } catch (err) {
      res.code(400)
      throw err
    }
  })
}

module.exports = fp(azureAD)
