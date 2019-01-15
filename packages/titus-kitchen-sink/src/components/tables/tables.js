import React from 'react'
import {Table} from '@nearform/titus-components'
import {columns, rows} from './mock/dessert-nutrients'
import Typography from '@material-ui/core/Typography'

const handleDelete = selected => {
  alert(selected.map(({rowData: [, {data}]}) => data))
}

const Tables = () => (
  <div>
    <Typography variant="h3" gutterBottom>Tables</Typography>
    <Typography paragraph>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
      atque.
    </Typography>
    <Table
      title="Material UI Table"
      columns={columns}
      rows={rows}
      onDelete={handleDelete}
    />
  </div>
)

export default Tables
