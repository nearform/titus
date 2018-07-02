'use strict'

const person = `
type Person {
    id: ID!
    firstName: String!
    lastName: String
    race: Race!
  }
`

const personInput = `
input PersonInput {
    firstName: String
    lastName: String
    race: String
    raceId: String
  }
`

module.exports = [person, personInput]
