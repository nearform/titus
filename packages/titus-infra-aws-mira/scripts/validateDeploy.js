'use strict'

const colors = require('colors')
const config = require('config')

const checkConfigExists = require('./lib/check-config-exists')
const validateConfig = require('./lib/validate-config')
const validateDockerContainer = require('./lib/validate-docker-container')
const validateCertificate = require('./lib/validate-certificate')

async function run() {
  try {
    const env = process.argv[2] || 'default'

    console.log('Validate configuration for environment: ', colors.green(env), '\n')

    checkConfigExists(config)
    await validateConfig(config, env)
    await validateDockerContainer(config, env)
    await validateCertificate(config, env)

    console.log('\n')
    console.log('Configuration check successfull, ready to deploy!! 🚀🚀🚀')
    console.log(`\nexec: ${colors.green('npm run deploy')}`)

  } catch (e) {
    if(e.errors) {
      e.errors.forEach(error => console.log(error))
    }
    console.log(e.message)
    process.exit(1)
  }
}

run()
