require('dotenv-expand')(require('dotenv').config())

const start = require('./migration-start')
const credentials = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD
}

module.exports = start(process.argv[2] || 'migrate', credentials)
