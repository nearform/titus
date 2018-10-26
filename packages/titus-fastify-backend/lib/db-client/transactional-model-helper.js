const ModelHelper = require('./model-helper')

module.exports = pg => modelFn => opts =>
  pg.transact(async pg => ModelHelper(pg)(modelFn)(opts))
