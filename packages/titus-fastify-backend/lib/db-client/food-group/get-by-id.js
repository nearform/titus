const SQL = require('@nearform/sql')
const camelize = require('camelize')

const dbErrors = require('../errors')

module.exports = async function getAll (pg, { id }) {
  const sql = SQL`
    SELECT
      id,
      name,
      created,
      modified
    FROM food_group
    WHERE id = ${id}
  `
  const result = await pg.query(sql)

  if (result.rowCount === 0) {
    throw new dbErrors.NotFoundError()
  }

  return camelize(result.rows[0])
}
