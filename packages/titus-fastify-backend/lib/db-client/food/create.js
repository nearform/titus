const SQL = require('@nearform/sql')
const camelize = require('camelize')

const getSql = ({ food }) => {
  if (food.foodGroupId) {
    return SQL`
      INSERT INTO food (
        name,
        food_group_id
      )
      VALUES (
        ${food.name},
        ${food.foodGroupId}
      )
      RETURNING id, name, food_group_id
    `
  }

  return SQL`
    INSERT INTO food (
      name,
      food_group_id
    )
    VALUES (
      ${food.name}, (
        SELECT
          id
        FROM food_group
        WHERE name = ${food.foodGroup}
      )
    )
    RETURNING id, name, food_group_id
  `
}

module.exports = async function search (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  const updated = camelize(result.rows[0])

  return {
    id: updated.id,
    typeName: 'Food',
    operation: 'create',
    count: result.rowCount,
    updated
  }
}
