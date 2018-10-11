const SQL = require('@nearform/sql')

const getSql = ({ id }) => {
  return SQL`
    DELETE FROM diet_type
    WHERE id = ${id}
  `
}

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  await pg.query(sql)

  return {
    id: opts.id,
    operation: 'delete'
  }
}
