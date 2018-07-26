'use strict'

const camelcase = require('camelcase')

const formatRows = rows => {
  return rows.map(row => {
    return Object.keys(row).reduce((acc, fieldName) => {
      acc[camelcase(fieldName)] = row[fieldName]
      return acc
    }, {})
  })
}

const sortByIdArray = (rows, ids) => {
  const dict = arrayToDict(rows)
  return ids.map(id => dict[id])
}

const arrayToDict = (arr = []) => {
  return arr.reduce((dict, obj = {}) => {
    dict[obj.id] = obj
    return dict
  }, {})
}

module.exports = {
  formatRows,
  sortByIdArray
}
