'use strict'

const {MiraConfig} = require("mira")
const AWS = require("aws-sdk")
const generator = require('generate-password')

const getParameter = require('./get-parameter')

async function createUser(email, password) {
  const cognitoConfig = {
    Username: email /* required */,
    DesiredDeliveryMediums: ['EMAIL'] /* required */,
    TemporaryPassword: password || generator.generate({
      length: 10,
      numbers: true,
      lowercase: true,
      uppercase: true
    }),
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  }
  cognitoConfig.UserPoolId = await getParameter('Titus/UserPoolId')

  console.log(`Create user '${email}' in the UserPool:`, cognitoConfig.UserPoolId)
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    region: MiraConfig.getEnvironment().env.region,
  })

  await cognitoidentityserviceprovider
    .adminCreateUser(cognitoConfig)
    .promise()

  console.log('User created:')
  console.log('Username:', email)
  console.log('Password:', cognitoConfig.TemporaryPassword)
}

module.exports = createUser
