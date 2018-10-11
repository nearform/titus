const SQL = require('@nearform/sql')
const camelize = require('camelize')

const getSql = ({ offset, limit }) => {
  return SQL`
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
}

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  return camelize(result.rows)
}
