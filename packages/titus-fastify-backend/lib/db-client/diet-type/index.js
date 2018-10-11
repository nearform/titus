const getAll = require('./get-all')
const deleteDietType = require('./delete')
const update = require('./update')

module.exports = {
  getAll,
  delete: deleteDietType,
  update
}
