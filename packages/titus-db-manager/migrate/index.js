'use strict'

module.exports = async function migrate(pg, { logger }) {
  await pg.migrate()
  logger.info('Database migrated')
  return true
}
