const path = require('path')

module.exports = {
  stories: ['../src/**/*.story.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    'storybook-readme/register'
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '.storybook': path.resolve(__dirname)
    }
    return config
  },
  core: {
    builder: 'webpack5'
  }
}
