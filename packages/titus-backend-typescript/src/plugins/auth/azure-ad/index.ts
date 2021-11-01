import querystring from 'querystring'

import fp from 'fastify-plugin'
import jwkToPem from 'jwk-to-pem'
import jws from 'jws'
import jwt, { JwtPayload } from 'jsonwebtoken'
import axios from 'axios'
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'

import { authRoutes } from '../../../config/auth-routes'
import configOptions from '../../../config'

type VerifyJWT = (
  options: { tenant?: string },
  idToken: string
) => Promise<JwtPayload & { oid: any }>

const verifyJWT: VerifyJWT = async ({ tenant }, idToken) => {
  if (!tenant) {
    throw new Error('No tenant configured')
  }
  const decoded = jws.decode(idToken)
  const identityMetadataURL = [
    'https://login.microsoftonline.com/',
    tenant,
    '/v2.0/.well-known/openid-configuration'
  ].join('')

  const { data: metadata } = await axios(identityMetadataURL)
  const {
    id_token_signing_alg_values_supported: algorithms,
    jwks_uri: jwksUri
  } = metadata

  const { data: body } = await axios(jwksUri)

  const findBy = decoded.header.x5t ? 'x5t' : 'kid'

  const key = body.keys.find((k) => k[findBy] === decoded.header[findBy])

  if (!key) {
    throw new Error('No matching key')
  }

  return new Promise((resolve, reject) => {
    jwt.verify(idToken, jwkToPem(key), { algorithms }, (error, token) => {
      if (error) {
        return reject(error)
      }
      if (!token) {
        return reject(new Error('No token'))
      }

      return resolve(token as any)
    })
  })
}

const getUser = async ({ tenant, appID, secret }, { oid }) => {
  const tokenURL = [
    'https://login.microsoftonline.com/',
    tenant,
    '/oauth2/v2.0/token'
  ].join('')

  const { data: body } = await axios({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    responseType: 'json',
    url: tokenURL,
    data: querystring.stringify({
      client_id: appID,
      client_secret: secret,
      grant_type: 'client_credentials',
      scope: 'https://graph.microsoft.com/.default'
    })
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
    oid,
    `?$select=${userProperties.join(',')}`
  ].join('')

  return axios({
    url: userURL,
    headers: { Authorization: `Bearer ${body.access_token}` },
    responseType: 'json'
  })
}

const azureAD: FastifyPluginAsync<typeof configOptions> = async (
  server,
  { auth }
) => {
  async function authenticate(req: FastifyRequest, res: FastifyReply) {
    const {
      headers: { authorization = '' },
      method,
      url = ''
    } = req.raw
    const authRoute = authRoutes.find(
      (r) => r.method === method && r.regex.test(url)
    )
    if (!authRoute) {
      return true
    }

    const token = authorization.replace('Bearer ', '')

    try {
      const verifiedToken = await verifyJWT(auth.azureAD, token)
      const { data: user } = await getUser(auth.azureAD, verifiedToken)
      req.user = user
    } catch (err) {
      res.code(400)
      throw err
    }
  }

  server.route({
    method: 'GET',
    url: '/userlist',
    onRequest: server.authenticate,
    // not supported in azure, return empty array
    handler: async () => []
  })

  server.route({
    method: 'GET',
    url: '/auth',
    onRequest: server.authenticate,
    handler: async ({ user }) => user || 'NO USER'
  })

  server.decorate('authenticate', authenticate)
}

export default fp(azureAD)
export const autoload = false
