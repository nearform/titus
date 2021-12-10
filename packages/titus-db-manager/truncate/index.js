'use strict'

module.exports = async function truncate(pg, { logger }) {
  await pg.query(`
    TRUNCATE TABLE
      some_table
    RESTART IDENTITY;
  `)
  logger.info('Database truncated')
  return true
}
