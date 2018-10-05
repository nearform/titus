'use strict'

const graphql = require('graphql')

const { schema } = require('../../lib/graphql')

test('executable schema is valid', async () => {
  graphql.assertValidSchema(schema)
})
