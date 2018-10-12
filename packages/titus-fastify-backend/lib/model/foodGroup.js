'use strict'

const DataLoader = require('dataloader')
const formatRows = require('./util').formatRows
const sortByIdArray = require('./util').sortByIdArray
const SQL = require('@nearform/sql')

const getByIds = async (pg, ids) => {
  const res = await pg.query(SQL`
  SELECT id, name, created, modified FROM food_group WHERE id = ANY(${[
    ids
  ]}::text[])`)
  return sortByIdArray(formatRows(res.rows), ids)
}

const dataloaders = pg => ({
  getById: new DataLoader(ids => {
    return getByIds(pg, ids)
  })
})

module.exports = {
  getByIds,
  dataloaders
}
