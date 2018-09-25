import React from 'react'
import { storiesOf } from '@storybook/react'

import DropArea from '../material/DropArea'
import GridList from '@material-ui/core/GridList'

const Cell = ({ children }) => (
  <div style={{ marginBottom: '10px', marginRight: '10px' }}>{children}</div>
)

storiesOf('Uploader/DropArea', module)
  .add('default', () => (
    <GridList cellHeight={180}>
      <Cell>
        <DropArea title="Upload" text="Drag here your file" />
      </Cell>
    </GridList>
  ))
  .add('with error', () => (
    <GridList cellHeight={180}>
      <Cell>
        <DropArea
          title="Drag here your file to upload"
          text="Max 5 files"
          error="Too many files dropped"
        />
      </Cell>
    </GridList>
  ))
