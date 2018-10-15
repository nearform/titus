'use strict'

const DataLoader = require('dataloader')
const dbClient = require('../db-client')

const getByIds = async (pg, idListOrSingleId) => {
  const ids = [].concat(idListOrSingleId)
  return dbClient({pg}).foodGroup.getByIds({ids})
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
