'use strict'

const query = `
type Query {
  person(id: ID): Person
  allPeople: [Person]
  race(id: ID): Race
  allRaces: [Race]
}
`

module.exports = [query]
