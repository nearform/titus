const SQL = require('@nearform/sql')
const camelize = require('camelize')

module.exports = async function getAll (pg) {
  const sql = SQL`
    SELECT
      id,
      name,
      created,
      modified
    FROM food_group
    ORDER BY name ASC
  `
  const result = await pg.query(sql)

  return camelize(result.rows)
}
