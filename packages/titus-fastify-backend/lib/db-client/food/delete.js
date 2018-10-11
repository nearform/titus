const SQL = require('@nearform/sql')

const getSql = ({ ids }) => {
  return SQL`
    DELETE FROM food
    WHERE id = ANY(${ids}::text[])
  `
}

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  return {
    ids: opts.ids,
    typeName: 'Food',
    operation: 'delete',
    count: result.rowCount
  }
}
