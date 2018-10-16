const SQL = require('@nearform/sql')
const camelize = require('camelize')

const dbErrors = require('../errors')

const getSql = ({ ids }) => {
  return SQL`
    WITH cte AS (
      SELECT
        id,
        index
      FROM UNNEST(${ids}::text[])
      WITH ORDINALITY t(id, index)
    )
    SELECT
      id,
      name,
      created,
      modified
    FROM food_group
    JOIN cte USING (id)
    ORDER BY index;
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
