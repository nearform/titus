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

const toTsQuery = query => {
  // here we're essentially breaking all the terms down in the search making each
  // word a prefix match using :* and tying them together using & operator
  // the regular expressions ensure single spacing before split, and that
  // embedded quotes and backslashes must be doubled within the search term
  // e.g. brian o'brien => 'brian':* & 'o''brien':*
  // see https://www.postgresql.org/docs/9.1/static/datatype-textsearch.html
  let tsQuery = query.trim()
  if (tsQuery !== '') {
    tsQuery =
      "'" + //
      tsQuery
        .replace(/ +/g, ' ')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "''")
        .split(' ')
        .join("':* & '") +
      "':*"
  }
  return tsQuery
}

module.exports = {
  formatRows,
  sortByIdArray,
  toTsQuery
}
