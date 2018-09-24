import externalLinks from 'remark-external-links'
import remarkBookmarks from 'remark-bookmarks'

const bookmarks = {
  'Material UI': 'https://material-ui.com/',
  downshift: 'https://github.com/paypal/downshift',
  '@nearform/react-table': 'https://github.com/nearform/react-table',
  'react-dnd': 'https://github.com/react-dnd/react-dnd',
  Stepper: 'https://material-ui.com/demos/steppers/'
}

export default {
  title: 'titus-components Documentation',
  description:
    'This is the official documentation of @nearform/titus-components',
  mdPlugins: [externalLinks.default, [remarkBookmarks, { bookmarks }]]
}
