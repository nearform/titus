'use strict'
const fs = require('fs')
const path = require('path')
const pino = require('./pino')

const paths = [
  '../packages/titus-backend',
  '../packages/titus-db-manager',
  '../packages/titus-frontend'
]

function cleanEnvs () {
  for (const pathDir of paths) {
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    fs.unlink(env, err => {
      err
        ? pino.warn(`No env file on ${pathDir}`)
        : pino.info(`Removed env on ${pathDir}`)
    })
  }
}


function createEnvs () {
  for (const pathDir of paths) {
    const sample = path.resolve(__dirname, `${pathDir}/.env.sample`)
    const env = path.resolve(__dirname, `${pathDir}/.env`)

    if (fs.existsSync(env)) {
      pino.warn(`File on ${pathDir} already exist`)
    } else {
      fs.copyFileSync(sample, env, fs.constants.COPYFILE_EXCL)
      pino.info(`Created env on ${pathDir}`)
    }
  }
}

const logger = require('pino')({
  prettyPrint: true,
  colorize: true
})

module.exports = pino

