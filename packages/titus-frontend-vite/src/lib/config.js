const config = {
  serverUrl: import.meta.env.VITE_API_PATH,
  enableAdmin: /true/i.test(import.meta.env.VITE_ENABLE_ADMIN),
  adminServerUrl: import.meta.env.VITE_ADMIN_API_PATH,
  env: import.meta.env.NODE_ENV,
  publicUrl: import.meta.env.PUBLIC_URL,
  remoteAwsConfigPath: import.meta.env.VITE_REMOTE_AWS_CONFIG_PATH,

  adal: {
    tenant: import.meta.env.VITE_AD_TENANT,
    clientId: import.meta.env.VITE_AD_APP_ID
  },
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE
  },
  aws: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_AWS_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_POOL_CLIENT_ID,
    identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID
  }
}

export default config
