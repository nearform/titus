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

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  const created = camelize(result.rows[0])

  return {
    id: created.id,
    typeName: 'Food',
    operation: 'create',
    count: result.rowCount,
    created
  }
}
