'use strict'

const query = `
  type Query {
    trails(id: ID): [Trail]
  }
`

module.exports = [query]
