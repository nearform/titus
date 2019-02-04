'use strict'

const formatRows = require('./util').formatRows
const SQL = require('@nearform/sql')

const getAll = async pg => {
  const res = await pg.query(SQL`
    SELECT id, name, created, modified, visible FROM diet_type ORDER BY name ASC`)
  return formatRows(res.rows)
}

const deleteDietType = async (pg, { id }) => {
  await pg.query(SQL`
    DELETE FROM diet_type WHERE id = ${id}`)
  return { id, operation: 'delete' }
}

const toggleDietTypeVisibility = async (pg, { id }) => {
  await pg.query(SQL`
    UPDATE diet_type SET visible = NOT visible WHERE id = ${id}`)
  return { id, operation: 'update' }
}

module.exports = {
  getAll,
  deleteDietType,
  toggleDietTypeVisibility
}
