'use strict'

const formatRows = require('./util').formatRows
const SQL = require('@nearform/sql')

const getById = async (pg, { id }) => {
  const res = await pg.query(SQL`
  SELECT id, name FROM race WHERE id = ${id}`)
  return formatRows(res.rows)[0]
}

const getAll = async pg => {
  const res = await pg.query(SQL`
      SELECT id, name FROM race`)
  return formatRows(res.rows)
}

const create = async (pg, { name }) => {
  const res = await pg.query(SQL`
  INSERT INTO race (name) VALUES (${name}) RETURNING id`)
  return { name, id: res.rows[0].id }
}

module.exports = {
  getById,
  getAll,
  create
}
