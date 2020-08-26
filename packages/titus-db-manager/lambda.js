const AWS = require('aws-sdk')

async function getSecret(secretName) {
  return new Promise((resolve, reject) => {
    const client = new AWS.SecretsManager()
    client.getSecretValue({ SecretId: secretName }, function (err, data) {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      const credentials = JSON.parse(data.SecretString)
      resolve({
        host: credentials.host,
        port: credentials.port,
        database: credentials.dbname,
        username: credentials.username,
        password: credentials.password
      })
    })
  })
}

const start = require('./migration-start')

module.exports = {
  handler: async () => {
    try {
      console.log('Migration Lambda Start')

      console.log('Retrieve the secrets from ', process.env.SECRET_ARN)
      const credentials = await getSecret(process.env.SECRET_ARN)
      console.log('Credentials: ', {
        ...credentials,
        password: '*************'
      })

      await start('migrate', credentials)
      console.log('Migration done successful')
    } catch (e) {
      console.log('Migration failed')
      console.error(e)
    }
  }
}
