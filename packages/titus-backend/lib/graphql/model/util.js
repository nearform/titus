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
  return ids.map(id => {
    return rows.find(r => r.id === id)
  })
}

module.exports = {
  formatRows,
  sortByIdArray
}
