'use strict'

require('dotenv-expand')(require('dotenv').config())
const logger = require('pino')()

const start = require('./migration-start')
const credentials = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD
}

async function run() {
  try {
    await start(process.argv[2] || 'migrate', credentials)
  } catch (err) {
    logger.error('An Error has occurred, stopping', err)
    process.exit(1)
  }
}

run()
