'use strict'

const SecretManagerServiceClient = require('@google-cloud/secret-manager')
  .SecretManagerServiceClient

class GcpClient {
  constructor () {
    this.sdk = new SecretManagerServiceClient()
  }

  async get(key) {
    try {
      const [version] = await this.sdk.accessSecretVersion({ name })
      return version.payload.data.toString('utf8')
    } catch (err) {
      // the error message from GCP SDK should get propagated to user as it contain path to the secret, project ID, etc..
      throw new Error(`Secret not found: ${name}`)
    }
  }
}

module.exports = GcpClient
