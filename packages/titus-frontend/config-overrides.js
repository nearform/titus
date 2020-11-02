const { override, addBabelPlugins } = require('customize-cra')

const alias = require('./aliases.config')

module.exports = override(
  ...addBabelPlugins(
    [
      'module-resolver',
      {
        root: ['./src'],
        alias
      }
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-optional-chaining'
  )
)
