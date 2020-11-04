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
    '@storybook/addon-knobs/register',
    '@storybook/preset-create-react-app',
    'storybook-readme/register'
  ]
}
