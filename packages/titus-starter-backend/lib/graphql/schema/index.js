'use strict'

const query = require('./query')
const mutation = require('./mutation')
const scalars = require('./scalars')
const results = require('./results')
const trail = require('./trail')

const schema = [].concat(query, mutation, scalars, results, trail)

module.exports = schema
