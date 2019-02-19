require('dotenv-expand')(require('dotenv').config())

const Postgrator = require('postgrator')

const migrate = async () => {
  try {
    const action = process.argv[2] || 'build'
    const postgress = await new Postgrator({
      migrationDirectory: `${__dirname}/migrations/${action}`,
      driver: 'pg',
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
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
