'use strict'

const {MiraConfig} = require("mira")
const AWS = require("aws-sdk")

const getParameter = require('./get-parameter')

async function listUsers() {
  const cognitoConfig = {}
  cognitoConfig.UserPoolId = await getParameter('Titus/UserPoolId')

  console.log('Retrieve user list for the UserPool:', cognitoConfig.UserPoolId)
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    region: MiraConfig.getEnvironment().env.region,
  })
  const result = await cognitoidentityserviceprovider
    .listUsers(cognitoConfig)
    .promise()

  if (result.Users.length === 0) {
    console.log('The UserPool contains no users')
    return
  }

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
}

module.exports = listUsers
