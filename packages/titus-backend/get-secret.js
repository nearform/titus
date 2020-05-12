const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

// Instantiates a client
const client = new SecretManagerServiceClient()

async function accessSecretVersion() {
  const [version] = await client.accessSecretVersion({
    name: 'projects/494141678371/secrets/test/versions/latest'
  })

  // Extract the payload as a string.
  const payload = version.payload.data.toString('utf8')

  console.info(payload)
}

accessSecretVersion()
