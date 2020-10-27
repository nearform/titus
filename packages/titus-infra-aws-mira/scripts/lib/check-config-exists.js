'use strict'

const colors = require('colors')

function checkConfigExists(config) {
  console.log(colors.blue(`Search for config`))
  if(!Object.keys(config).length) {
    const errorMessage = `Config fila 'config/default.json' not found

You can start copying the config/default.sample.json 
${colors.green(`cp config/default.sample.json  config/default.json`)}
`
    throw new Error(errorMessage)
  }
  console.log(`Config files found`)
}

module.exports = checkConfigExists
