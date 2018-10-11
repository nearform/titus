const SQL = require('@nearform/sql')
const camelize = require('camelize')

const dbErrors = require('../errors')

const getSql = ({ foodId }) => {
  return SQL`
    SELECT
      id,
      name,
      food_group_id,
      created,
      modified,
      sys_period
    FROM food_history
    WHERE id = ${foodId}
  `
}

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  if (result.rowCount === 0) {
    throw new dbErrors.NotFoundError()
  }

  return camelize(result.rows)
}
