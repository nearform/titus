'use strict'
require('dotenv').config()
const Postgrator = require('postgrator')
const migrate = async () => {
  try {
    const action = process.argv[2] || 'build'
    const postgress = await new Postgrator({
      migrationDirectory: `${__dirname}/migrations/${action}`,
      driver: 'pg',
      host: process.env.PGHOST || 'postgres',
      port: process.env.PGPORT || '5432',
      database: process.env.POSTGRES_DB || 'postgres',
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      schemaTable: `schemaversion_${action}`
    })
    const appliedMigrations = await postgress.migrate()
    console.log(appliedMigrations)
  } catch (error) {
    console.error(error)
    process.exit()
  }
}

module.exports = migrate()
