'use strict'

const person = require('./person')
const race = require('./race')
const query = require('./query')
const mutation = require('./mutation')

const schema = [...query, ...mutation, ...person, ...race]

module.exports = schema
