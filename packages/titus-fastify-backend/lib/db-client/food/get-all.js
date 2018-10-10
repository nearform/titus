const SQL = require('@nearform/sql')
const camelize = require('camelize')

module.exports = async function getAll (pg, { offset, limit }) {
  const sql = SQL`
    SELECT
      id,
      name,
      food_group_id,
      created,
      modified
    FROM food
    ORDER BY
      created,
      name
    OFFSET ${offset}
    LIMIT ${limit}
  `
  const result = await pg.query(sql)

  return camelize(result.rows)
}
