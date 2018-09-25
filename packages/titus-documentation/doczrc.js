import * as path from 'path'
import externalLinks from 'remark-external-links'
import remarkBookmarks from 'remark-bookmarks'

const bookmarks = {
  '@nearform/react-table': 'https://github.com/nearform/react-table',
  'create-react-app': 'https://github.com/facebook/create-react-app',
  'Material UI': 'https://material-ui.com/',
  'Reach Router': 'https://reach.tech/router',
  'react-apollo': 'https://github.com/apollographql/react-apollo',
  'react-dnd': 'https://github.com/react-dnd/react-dnd',
  'titus-components': '/titus-components',
  Apollo: 'https://www.apollographql.com/',
  Docker: 'https://www.docker.com/',
  downshift: 'https://github.com/paypal/downshift',
  GraphQL: 'https://graphql.org/',
  Hapi: 'https://hapijs.com/',
  PostgreSQL: 'https://www.postgresql.org/',
  Stepper: 'https://material-ui.com/demos/steppers/',
  Storybook: 'https://storybook.js.org/'
}

const SRC = path.resolve(__dirname, 'src')
const PACKAGES = path.resolve(__dirname, '../')
const ROOT = path.resolve(__dirname, '../../')

export default {
  description: 'This is the official documentation of @nearform/titus monorepo',
  mdPlugins: [externalLinks.default, [remarkBookmarks, { bookmarks }]],
  src: PACKAGES,
  files: `{*/src/*.mdx,*/src/**/*.mdx}`,
  dest: `../../docs`,
  base: '/titus/',
  hashRouter: true,
  modifyBundlerConfig: config => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      // '@fonts': `${PUBLIC}/fonts`,
      // '@images': `${PUBLIC}/images`,
      // '@components': `${ROOT}/packages/titus-components/es`,
      '@styles': `${SRC}/theme/styles`
    })

    return config
  }
}
