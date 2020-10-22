'use strict'

const AWS = require('aws-sdk')
const logger = require('pino')()

function getSecret(secretName) {
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
      logger.info('Migration Lambda Start')

      logger.info('Retrieve the secrets from ', process.env.SECRET_ARN)
      const credentials = await getSecret(process.env.SECRET_ARN)
      await start('migrate', credentials)
      await start('seed', credentials)
      logger.info('Migration done successful')
    } catch (e) {
      logger.errot('Migration failed')
      logger.error(e)
    }
  }
}
