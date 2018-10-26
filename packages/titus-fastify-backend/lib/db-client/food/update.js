const SQL = require('@nearform/sql')
const camelize = require('camelize')

const dbErrors = require('../errors')

const getSql = ({ food }) => {
  return SQL`
    UPDATE food
    SET
      name = ${food.name},
      food_group_id = ${food.foodGroupId},
      modified = now()
    WHERE id = ${food.id}
    RETURNING id, name, food_group_id
  `
}

module.exports = async function(pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  if (result.rowCount === 0) {
    throw new dbErrors.NotFoundError()
  }

  const updated = camelize(result.rows[0])

  return {
    id: updated.id,
    typeName: 'Food',
    operation: 'update',
    count: result.rowCount,
    updated
  }
}
