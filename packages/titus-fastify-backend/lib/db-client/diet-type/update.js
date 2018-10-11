const SQL = require('@nearform/sql')
const camelize = require('camelize')

const dbErrors = require('../errors')

const getSql = ({ id, name, visible }) => {
  return SQL`
    UPDATE diet_type
    SET
      name = COALESCE(${name}, name),
      visible = COALESCE(${visible}, visible)
    WHERE id = ${id}
  `
}

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  if (result.rowCount === 0) {
    throw new dbErrors.NotFoundError()
  }

  const updated = camelize(result.rows[0])

  return {
    id: opts.id,
    typeName: 'DietType',
    operation: 'update',
    count: result.rowCount,
    updated
  }
}
