'use strict'

const {MiraConfig} = require("mira")
const AWS = require("aws-sdk")
const colors = require("colors")

async function getParameter(value) {
  const parameterName = `/${MiraConfig.calculateSharedResourceName('param')}/${value}`
  try {
    const client = new AWS.SSM({region: MiraConfig.getEnvironment().env.region})
    const parameter = await client.getParameter({Name: parameterName}).promise()
    return parameter.Parameter.Value
  } catch (e) {
    if (e.code === 'ParameterNotFound') {
      console.error(colors.red(`ERROR: Parameter ${parameterName} not found`))
    }
    if (e.code === 'ConfigError') {
      console.error(colors.red(`ERROR: ${e.message}`))
    }
    throw e
  }
}

module.exports = getParameter
