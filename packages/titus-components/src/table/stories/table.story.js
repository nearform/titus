import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { columns, rows } from './dessert-nutrients'
import Table from '../table'

storiesOf('Table', module)
  .add('default', () => (
    <Table
      title="Dessert nutrients"
      columns={columns}
      rows={rows}
      onDelete={action('delete rows')}
    />
  ))