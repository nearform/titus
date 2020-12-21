const config = {
  serverUrl: process.env.REACT_APP_API_PATH,
  enableAdmin: /true/i.test(process.env.REACT_APP_ENABLE_ADMIN),
  adminServerUrl: process.env.REACT_APP_ADMIN_API_PATH,
  env: process.env.NODE_ENV,
  publicUrl: process.env.PUBLIC_URL,
  remoteAwsConfigPath: process.env.REACT_APP_REMOTE_AWS_CONFIG_PATH,

  adal: {
    tenant: process.env.REACT_APP_AD_TENANT,
    clientId: process.env.REACT_APP_AD_APP_ID
  },
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
  },
  aws: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_POOL_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID
  }
}

export default config
