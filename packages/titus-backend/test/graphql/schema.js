'use strict'

const schema = require('../../lib/graphql').schema
const graphql = require('graphql')

test('schema is valid', async () => {
  graphql.assertValidSchema(schema)
})
