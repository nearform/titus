'use strict'

const formatRows = require('./util').formatRows
const SQL = require('@nearform/sql')

const getById = async (pg, { id }) => {
  const res = await pg.query(SQL`
    SELECT * FROM person WHERE id = ${id}`)
  return formatRows(res.rows)[0]
}

const getAll = async pg => {
  const res = await pg.query(SQL`
      SELECT * FROM person`)
  return formatRows(res.rows)
}

const create = async (pg, { person }) => {
  const sql = person.raceId
    ? SQL`INSERT INTO person (first_name, last_name, race_id)
    VALUES (${person.firstName}, ${person.lastName}, ${person.raceId})
    RETURNING id`
    : SQL`INSERT INTO person (first_name, last_name, race_id)
    VALUES (${person.firstName}, ${
  person.lastName
}, (SELECT id FROM race WHERE name = ${person.race}))
      RETURNING id`
  const res = await pg.query(sql)
  return res.rows[0].id
}

module.exports = {
  getById,
  getAll,
  create
}
