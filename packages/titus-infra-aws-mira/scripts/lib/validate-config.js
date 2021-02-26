'use strict'

const colors = require('colors')
const yup = require('yup')

async function validateConfig(config, env) {
  const configSchema = yup.object().shape({
    app: yup.object().shape({prefix: yup.string().required(), name: yup.string().required()}),
    dev: yup.object().shape({target: yup.string().required()}),
    accounts: yup.object().shape({
      [env]: yup.object().shape({
        env: yup.object().shape({
          account: yup.string().required(),
          region: yup.string().required(),
          domainName: yup.string().required(),
          webAppUrl: yup.string().required(),
          certificateSslName: yup.string().required(),
          awsEcrRepositoryName: yup.string().required()
        }),
        profile: yup.string().required()
      })
    }),
  })
  await configSchema.validate(config, {abortEarly: false})

  if (config.accounts.default.env.account === '0000000000000') {
    throw new Error(colors.red("\nThe account '0000000000000' is not valid. Set a proper account"))
  }

  console.log('Config file valid\n')
}

module.exports = validateConfig
