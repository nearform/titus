import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal'

const { REACT_APP_AD_TENANT, REACT_APP_AD_APP_ID } = process.env

export const adalConfig = {
  tenant: REACT_APP_AD_TENANT,
  clientId: REACT_APP_AD_APP_ID,
  endpoints: { api: REACT_APP_AD_APP_ID },
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
