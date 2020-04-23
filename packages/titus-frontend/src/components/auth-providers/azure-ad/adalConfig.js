import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal'

import config from '../../../config'

export const adalConfig = {
  tenant: config.adal.tenant,
  clientId: config.adal.clientId,
  endpoints: { api: config.adal.clientId },
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
