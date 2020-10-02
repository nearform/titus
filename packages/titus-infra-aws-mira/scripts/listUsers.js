'use strict'

const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

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

const listUsers = async () => {
  try {
    console.log('User list')
    const result = await cognitoidentityserviceprovider
      .listUsers({
        UserPoolId: config.UserPoolId /* required */,
      })
      .promise()
    console.log(JSON.stringify(result.Users, null, 2))

    const users = result.Users.map(user => (
      {
        username: user.Username,
        email: (user.Attributes.find(attribute => attribute.Name === 'email') || {}).Value,
        createdAt: user.UserCreateDate,
        enabled: user.Enabled,
        status: user.UserStatus,
      }
    ))

    console.log(users)
  } catch (e) {
    console.error(e)
    return
  }
}

listUsers().catch((err) => {
  console.error(err)
  process.exit(1)
})
