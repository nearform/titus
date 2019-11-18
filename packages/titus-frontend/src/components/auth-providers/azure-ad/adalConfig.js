import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal'

export const adalConfig = {
  tenant: process.env.REACT_APP_AD_TENANT,
  clientId: process.env.REACT_APP_AD_APP_ID,
  endpoints: { api: process.env.REACT_APP_AD_APP_ID },
  cacheLocation: 'localStorage'
}

export const authContext = adalConfig.clientId
  ? new AuthenticationContext(adalConfig)
  : null

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options)

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
)
