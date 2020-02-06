'use strict'
const fs = require('fs')
const path = require('path')
const pino = require('./pino')

const paths = [
  '../packages/titus-backend',
  '../packages/titus-db-manager',
  '../packages/titus-frontend'
]

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
