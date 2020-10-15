'use strict'

const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

const argv = require('yargs')
  .usage('Usage: $0 --email [email|username] --password [...]')
  .demandOption(['email', 'password']).argv

const configFile = path.resolve(__dirname, '..', 'output.json')
if (!fs.existsSync(configFile)) {
  console.error('File `output.json` not found. Deploy the infrastructure to generate it')
  return
}

let config
try {
  config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))['Nf-TitusApp-Service-default-MainStack']
} catch (e) {
  console.error('File `output.json` not valid.', e.message)
  return
}

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: config.Region,
})

const createUser = async () => {
  try {
    console.log('User creation')
    await cognitoidentityserviceprovider
      .adminCreateUser({
        UserPoolId: config.UserPoolId /* required */,
        Username: argv.email /* required */,
        DesiredDeliveryMediums: ['EMAIL'] /* required */,
        TemporaryPassword: argv.password || '124testABC!',
        UserAttributes: [
          {
            Name: 'email',
            Value: argv.email,
          },
        ],
      })
      .promise()
    console.log('User created')
  } catch (e) {
    console.error(e)
    return
  }

  const data = {
    username: argv.email,
    password: argv.password,
  }


  fs.writeFileSync(path.join(
    __dirname,
    `../${argv.email}-test-user.json`
  ), JSON.stringify(data, null, 2))

  console.log(
    `\nsaved the following info in ${path.join(
      __dirname,
      `../${argv.email}-test-user.json`
    )}\n\n`,
    JSON.stringify(data, null, 2),
    '\n\n'
  )
}

createUser().catch((err) => {
  console.error(err)
  process.exit(1)
})
