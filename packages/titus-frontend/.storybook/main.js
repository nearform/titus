const path = require('path')
module.exports = {
  stories: ['../src/**/*.story.@(js|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    },
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs',
    '@storybook/preset-create-react-app',
    'storybook-readme/register'
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '.storybook': path.resolve(__dirname)
    }
    return config
  }
}
