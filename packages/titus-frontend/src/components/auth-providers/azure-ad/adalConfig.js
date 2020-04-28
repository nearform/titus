import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal'

export const getAdalConfig = config => ({
  tenant: config.adal.tenant,
  clientId: config.adal.clientId,
  endpoints: { api: config.adal.clientId },
  cacheLocation: 'localStorage'
})

export const getAuthContext = config => {
  const adalConfigObj = getAdalConfig(config)
  return adalConfigObj.clientId
    ? new AuthenticationContext(adalConfigObj)
    : null
}

export const adalApiFetch = (auth, config, fetch, url, options) =>
  adalFetch(auth, config.endpoints.api, fetch, url, options)

export const withAdalLoginApi = config => {
  const authContext = getAuthContext(config)
  const adalConfig = getAdalConfig(config)

  return withAdalLogin(authContext, adalConfig.endpoints.api)
}
