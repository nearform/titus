'use strict'

const fp = require('fastify-plugin')
const jwkToPem = require('jwk-to-pem')
const jws = require('jws')
const jwt = require('jsonwebtoken')
const request = require('request')

const verifyJWT = (config, idToken, cb) => {
  const decoded = jws.decode(idToken)
  const identityMetadataURL = [
    'https://login.microsoftonline.com/',
    config.tenant,
    '/v2.0/.well-known/openid-configuration'
  ].join('')
  request(identityMetadataURL, { json: true }, (error, response, metadata) => {
    if (error) {
      return cb(error)
    }
    const {
      id_token_signing_alg_values_supported: algorithms,
      jwks_uri: jwksUri
    } = metadata
    request(jwksUri, { json: true }, (error, response, body) => {
      if (error) {
        return cb(error)
      }
      let findBy = 'x5t'
      if (!decoded.header.x5t) {
        findBy = 'kid'
      }
      const key = body.keys.find(k => k[findBy] === decoded.header[findBy])
      if (!key) {
        return cb(new Error('No matching key'))
      }
      const pem = jwkToPem(key)
      const props = { algorithms }
      jwt.verify(idToken, pem, props, (error, token) => {
        if (error) {
          return cb(error)
        }
        cb(null, token)
      })
    })
  })
}

async function azureAD(server, options) {
  server.addHook('onRequest', (req, res, done) => {
    const {
      headers: { authorization = '' }
      // method,
      // originalUrl
    } = req.raw
    const token = authorization.replace('Bearer ', '')
    verifyJWT(options.azureAD, token, (error, verifiedToken) => {
      if (error) {
        res.code(400)
        throw new Error('You are not authorized')
      }
      console.log(verifiedToken)
      done()
    })
  })
}

module.exports = fp(azureAD)
