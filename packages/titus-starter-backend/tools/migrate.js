'use strict'

const Postgrator = require('postgrator')

new Postgrator({
  migrationDirectory: `${__dirname}/migrations/${process.argv[2]}`,
  driver: 'pg',
  host: process.env.PGHOST || 'postgres',
  port: process.env.PGPORT || '5432',
  database: process.env.POSTGRES_DB || 'postgres',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  schemaTable: `schemaversion_${process.argv[2]}`
})
  .migrate()
  .then(appliedMigrations => {
    console.log(appliedMigrations)
  })
  .catch(error => {
    console.error(error)
    process.exit()
  })
