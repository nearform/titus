require('dotenv-expand')(require('dotenv').config())
const { Client } = require('pg')
const Postgrator = require('postgrator')

const checkPGRunning = (cb, count = 0) => {
  // it can take a few seconds for the PG container to be running
  // so give it 15 seconds before starting the migrations
  const client = new Client()
  client
    .connect()
    .then(() => client.end().then(cb))
    .catch(() => {
      if (count === 15) {
        throw new Error('PostgreSQL container is not running after 15 seconds')
      }
      setTimeout(() => {
        checkPGRunning(cb, count + 1)
      }, 1000)
    })
}

const migrate = () => {
  checkPGRunning(async () => {
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
      console.log(error)
      process.exit()
    }
  })
}

module.exports = migrate()
