'use strict'

const DataLoader = require('dataloader')

module.exports = (dbClient) => {
  return {
    foodGroup: {
      getByIds: new DataLoader(async (idsOrId) => {
        const ids = [].concat(idsOrId)
        return dbClient.foodGroup.getByIds({ids})
      })
    }
  }
}
