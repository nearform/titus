'use strict'

const graphql = require('graphql')

const { schema } = require('../../lib/graphql')

test('schema is valid', async () => {
  graphql.assertValidSchema(schema)
})
