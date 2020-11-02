const aliases = require('../aliases.config')
const path = require('path')

const aliasesStoryBook = {}

Object.keys(aliases).map(alias => {
  aliasesStoryBook[alias] = path.resolve(__dirname, '../' + aliases[alias])
})

module.exports = {
  stories: ['../src/**/*.story.(js|mdx)'],
  addons: [
    '@storybook/addon-a11y/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    },
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-options/register',
    '@storybook/preset-create-react-app',
    'storybook-readme/register'
  ],
  webpackFinal: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...aliasesStoryBook
      }
    }
  })
}
