'use strict'

const foodGroup = require('./foodGroup')

module.exports = {
  loaders: pg => {
    return {
      foodGroup: foodGroup.dataloaders(pg)
    }
  }
}
