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

module.exports = {
  formatRows
}
