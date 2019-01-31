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

const searchPath = path.resolve(__dirname, '../')
const base = '/titus'

export default {
  description: 'This is the official documentation of @nearform/titus monorepo',
  mdPlugins: [externalLinks.default, [remarkBookmarks, { bookmarks }]],
  src: searchPath,
  files: `{*/*.mdx,*/src/*.mdx,*/src/**/*.mdx}`,
  dest: `../../docs`,
  base: `${base}/`,
  hashRouter: true,
  repository: 'https://github.com/nearform/titus',
  indexHtml: 'src/index.html',
  htmlContext: {
    favicon: `public/favicon.png`
  },
  themeConfig: {
    logo: {
      src: `public/logo.svg`,
      width: 150
    },
    colors: {
      primary: nearformTheme.colors.blue,
      text: nearformTheme.colors.sand4,
      link: nearformTheme.colors.blue,
      background: nearformTheme.colors.sand1,
      sidebarBg: '#f7f7f7',
      sidebarText: nearformTheme.colors.sand4
    },
    styles: {
      body: {
        fontFamily: "'Poppins', sans-serif"
      },
      h1: {
        color: nearformTheme.colors.midnightBlue,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 100
      },
      h2: {
        color: nearformTheme.colors.supersplit,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 100
      },
      h3: {
        color: nearformTheme.colors.brunchPink,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 100
      },
      h4: {
        color: nearformTheme.colors.bubblegum,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 100
      }
    }
  }
}
