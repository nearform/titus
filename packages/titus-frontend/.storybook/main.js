module.exports = {
  stories: ['../src/**/*.story.(js|mdx)'],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-options/register',
    'storybook-readme/register'
  ]
}
