import * as path from 'path'
import externalLinks from 'remark-external-links'
import remarkBookmarks from 'remark-bookmarks'

// Add all bookmarks here that should be shared they 
// can be referenced in .mdx like so: [link-name]
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

const theme = {
  logo: {
    src: `public/logo.svg`,
    width: 150
  },
  fonts: {
    primary: "'Poppins', sans-serif"
  },
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

export default {
  description: 'This is the official documentation of @nearform/titus monorepo',
  mdPlugins: [externalLinks.default, [remarkBookmarks, { bookmarks }]],
  src: path.resolve(__dirname, '../'),
  files: `{*/*.mdx,*/src/*.mdx,*/src/**/*.mdx}`,
  dest: `../../docs`,
  base: `/titus/`,
  hashRouter: true,
  repository: 'https://github.com/nearform/titus',
  indexHtml: 'src/index.html',
  htmlContext: {
    favicon: `public/favicon.png`
  },
  themeConfig: {
    logo: theme.logo,
    colors: {
      primary: theme.colors.blue,
      text: theme.colors.sand4,
      link: theme.colors.blue,
      background: theme.colors.sand1,
      sidebarBg: '#f7f7f7',
      sidebarText: theme.colors.sand4
    },
    styles: {
      body: {
        fontFamily: theme.fonts.primary
      },
      h1: {
        color: theme.colors.midnightBlue,
        fontFamily: theme.fonts.primary,
        fontWeight: 100
      },
      h2: {
        color: theme.colors.supersplit,
        fontFamily: theme.fonts.primary,
        fontWeight: 100
      },
      h3: {
        color: theme.colors.brunchPink,
        fontFamily: theme.fonts.primary,
        fontWeight: 100
      },
      h4: {
        color: theme.colors.bubblegum,
        fontFamily: theme.fonts.primary,
        fontWeight: 100
      }
    }
  }
}
