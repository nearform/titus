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

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  const created = camelize(result.rows[0])

  return {
    id: created.id,
    typeName: 'FoodGroup',
    operation: 'create',
    count: result.rowCount,
    created
  }
}
