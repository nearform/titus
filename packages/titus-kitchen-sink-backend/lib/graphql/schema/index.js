'use strict'

const food = require('./food')
const foodHistory = require('./foodHistory')
const foodGroup = require('./foodGroup')
const dietType = require('./dietType')
const query = require('./query')
const mutation = require('./mutation')
const scalars = require('./scalars')
const results = require('./results')

const schema = [].concat(
  query,
  mutation,
  food,
  foodHistory,
  foodGroup,
  dietType,
  scalars,
  results
)

module.exports = schema
