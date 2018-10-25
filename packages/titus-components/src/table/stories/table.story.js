import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'

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
  .add('with helper text', () => (
    <Table
      title="Dessert nutrients"
      columns={columns}
      rows={rows}
      onDelete={action('delete rows')}
    >
      <TableFooter>
        <TableRow>
          <TableCell colspan="6">
            <Typography variant="caption" align="right">
              <i>Use the controls above to see more items</i>
            </Typography>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ))
