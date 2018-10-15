const SQL = require('@nearform/sql')
const camelize = require('camelize')

const {sortByIdArray} = require('./util')

const dbErrors = require('../errors')

const getSql = ({ ids }) => {
  return SQL`
  SELECT id, name, created, modified FROM food_group WHERE id = ANY(${[
    ids
  ]}::text[])`
}

module.exports = async function (pg, opts) {
  const sql = getSql(opts)

  const result = await pg.query(sql)

  if (result.rowCount === 0) {
    throw new dbErrors.NotFoundError()
  }

  return sortByIdArray(camelize(result.rows), opts.ids)
}
