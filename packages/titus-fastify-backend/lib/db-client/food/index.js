const getAll = require('./get-all')
const getById = require('./get-by-id')
const search = require('./search')
const keyword = require('./keyword-search')
const create = require('./create')
const update = require('./update')
const deleteFood = require('./delete')
const history = require('./history')

module.exports = {
  getAll,
  getById,
  search,
  keyword,
  create,
  update,
  delete: deleteFood,
  history
}
