const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function override(config) {
  const plugins = [
    new CopyWebpackPlugin([
      {
        from: 'src/robots.txt',
        to: 'robots.txt',
        toType: 'file'
      }
    ])
  ]

  config.plugins.push(...plugins)

  return config
}
