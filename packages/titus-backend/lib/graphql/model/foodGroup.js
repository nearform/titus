'use strict'

const DataLoader = require('dataloader')
const formatRows = require('./util').formatRows
const sortByIdArray = require('./util').sortByIdArray
const SQL = require('@nearform/sql')

const getById = async (pg, { id }) => {
  const res = await pg.query(SQL`
     SELECT id, name, created, modified FROM food_group WHERE id = ${id}`)
  return formatRows(res.rows)[0]
}

const getByIds = async (pg, ids) => {
  const res = await pg.query(SQL`
  SELECT id, name, created, modified FROM food_group WHERE id = ANY(${[ids]}::text[])`)
  return sortByIdArray(formatRows(res.rows), ids)
}

const getAll = async pg => {
  const res = await pg.query(SQL`
      SELECT id, name, created, modified FROM food_group`)
  return formatRows(res.rows)
}

const create = async (pg, { name }) => {
  const res = await pg.query(SQL`
  INSERT INTO food_group (name) VALUES (${name}) RETURNING id`)
  return { name, id: res.rows[0].id }
}

const dataloaders = (pg) => ({
  getById: new DataLoader((ids) => {
    return getByIds(pg, ids)
  })
})

module.exports = {
  getById,
  getByIds,
  getAll,
  create,
  dataloaders
}
