import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import GridList from '@material-ui/core/GridList'

import DisplayCard from '../material/DisplayCard'

const Cell = ({ children }) => (
  <div style={{ marginBottom: '10px', marginRight: '10px' }}>{children}</div>
)

storiesOf('UploadDisplayCard', module).add('default', () => (
  <GridList cellHeight={180}>
    <Cell>
      <DisplayCard
        mediaImage='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikipedia-logo-en-big.png/734px-Wikipedia-logo-en-big.png'
        name='Some url name'
        title='Set some title'
        size={12345678}
        uploadProgress={1}
        onAbortUpload={action('Cancel upload')}
      />
    </Cell>
    <Cell>
      <DisplayCard
        mediaImage='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikipedia-logo-en-big.png/734px-Wikipedia-logo-en-big.png'
        name='Some url name'
        title='Set some title'
        size={12345678}
        uploadProgress={20}
        onAbortUpload={action('Cancel upload')}
      />
    </Cell>
    <Cell>
      <DisplayCard
        mediaImage='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikipedia-logo-en-big.png/734px-Wikipedia-logo-en-big.png'
        name='Some very very long url name'
        size={12345678}
        uploadProgress={60}
        onAbortUpload={action('Cancel upload')}
      />
    </Cell>
    <Cell>
      <DisplayCard
        mediaImage='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikipedia-logo-en-big.png/734px-Wikipedia-logo-en-big.png'
        name='Some very very long url name'
        size={12345678}
        uploadProgress={100}
        onAbortUpload={action('Cancel upload')}
      />
    </Cell>
    <Cell>
      <DisplayCard

        name='Some very very long url name'
        size={12345678}
        uploadProgress={100}
        onAbortUpload={action('Cancel upload')}
      />
    </Cell>
  </GridList>
))
