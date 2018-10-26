const SQL = require('@nearform/sql')
const camelize = require('camelize')

const dbErrors = require('../errors')

const getSql = ({ id }) => {
  return SQL`
    SELECT
      id,
      name,
      food_group_id,
      created,
      modified
    FROM food
    WHERE id = ${id}
  `
}

module.exports = async function(pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  if (result.rowCount === 0) {
    throw new dbErrors.NotFoundError()
  }

  return camelize(result.rows[0])
}
