'use strict'

const mutation = `
type Mutation {
  createPerson(person: PersonInput): Person
  createRace(name: String): Race
}
`

module.exports = [mutation]
