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
  const env = path.resolve(__dirname, `${pathDir}/.env`)

  fs.unlink(env, err => {
    err
      ? pino.warn(`No env file on ${pathDir}`)
      : pino.info(`Removed env on ${pathDir}`)
  })
}
