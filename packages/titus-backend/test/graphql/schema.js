'use strict'

const schema = require('../../lib/graphql')()
const graphql = require('graphql')

test('schema is valid', async () => {
  graphql.assertValidSchema(schema)
})
