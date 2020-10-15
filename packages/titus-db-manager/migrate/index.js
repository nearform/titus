'use strict'

const logger = require('pino')()

const migrate = async pg => {
  await pg.migrate()
  logger.info('Database migrated')
  return true
}

module.exports = migrate
