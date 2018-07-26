'use strict'

const formatRows = require('./util').formatRows
const SQL = require('@nearform/sql')

const getAll = async (pg) => {
  const res = await pg.query(SQL`
    SELECT
      id,
      "when",
      who_id,
      what_id,
      subject_id,
      who_data,
      what_data,
      subject_data,
      "where",
      why,
      meta
    FROM
      trails
    `)
  return formatRows(res.rows)
}

const deleteTrails = async (pg, { ids }) => {
  const res = await pg.query(SQL`
    DELETE FROM trails WHERE id = ANY(${[ids]}::bigint[])`)
  return { ids, typeName: 'Trail', operation: 'delete', count: res.rowCount }
}

module.exports = {
  getAll,
  deleteTrails
}
