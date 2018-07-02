'use strict'

const food = require('./food')
const foodGroup = require('./foodGroup')
const query = require('./query')
const mutation = require('./mutation')
const scalars = require('./scalars')
const results = require('./results')

const schema = [...query, ...mutation, ...food, ...foodGroup, ...scalars, ...results]

module.exports = schema
