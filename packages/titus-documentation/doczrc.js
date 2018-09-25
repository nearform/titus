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

const nearformTheme = {
  colors: {
    blue: '#2165e5',
    midnightBlue: '#194cac',
    sand4: '#6d6d68',
    sand3: '#908a8a',
    sand2: '#a8a4a3',
    sand1: '#f4f4f2',
    supersplit: '#fd775e',
    brunchPink: '#fd7a9e',
    bubblegum: '#f9c3c0'
  }
}

const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')
const PACKAGES = path.resolve(__dirname, '../')
const ROOT = path.resolve(__dirname, '../../')

export default {
  description: 'This is the official documentation of @nearform/titus monorepo',
  mdPlugins: [externalLinks.default, [remarkBookmarks, { bookmarks }]],
  src: PACKAGES,
  files: `{*/src/*.mdx,*/src/**/*.mdx}`,
  dest: `../../docz`,
  // base: '/titus/',
  hashRouter: true,
  repository: 'https://github.com/nearform/titus',
  htmlContext: {
    favicon: '/static/img/favicon.png'
  },
  theme: 'src/theme/index',
  // theme: 'dist/src/theme/index',
  modifyBundlerConfig: config => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@fonts': `${PUBLIC}/fonts`,
      '@images': `${PUBLIC}/images`,
      '@components': `${SRC}/theme/components`,
      '@styles': `${SRC}/theme/styles`
    })

    return config
  }
  // themeConfig: {
  //   logo: {
  //     src: '/static/img/logo.svg'
  //   },
  //   colors: {
  //     primary: nearformTheme.colors.midnightBlue,
  //     text: nearformTheme.colors.sand4,
  //     link: nearformTheme.colors.blue,
  //     background: nearformTheme.colors.sand1,
  //     sidebarBg: '#f7f7f7',
  //     sidebarText: nearformTheme.colors.sand4
  //   },
  //   styles: {
  //     h1: {
  //       color: nearformTheme.colors.midnightBlue
  //     },
  //     h2: {
  //       color: nearformTheme.colors.supersplit
  //     },
  //     h3: {
  //       color: nearformTheme.colors.brunchPink
  //     },
  //     h4: {
  //       color: nearformTheme.colors.bubblegum
  //     }
  //   }
  // }
}
