const rewireGqlTag = require('react-app-rewire-graphql-tag')

module.exports = function override(config, env) {
  config = rewireGqlTag(config, env)

  return config
}
