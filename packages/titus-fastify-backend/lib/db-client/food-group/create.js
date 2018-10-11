const SQL = require('@nearform/sql')
const camelize = require('camelize')

const getSql = ({ name }) => {
  return SQL`
    INSERT INTO food_group (
      name
    )
    VALUES (
      ${name}
    )
    RETURNING id, name
  `
}

module.exports = async function search (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  const updated = camelize(result.rows[0])

  return {
    id: updated.id,
    typeName: 'FoodGroup',
    operation: 'create',
    count: result.rowCount,
    updated
  }
}
