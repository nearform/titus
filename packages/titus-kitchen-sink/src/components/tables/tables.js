import React from 'react'
import {Table} from '@nearform/titus-components'
import {columns, rows} from './mock/dessert-nutrients'
import {Grid, Typography} from "@material-ui/core"

const handleDelete = selected => {
  alert(selected.map(({rowData: [, {data}]}) => data))
}

const Tables = () => (
  <Grid container spacing={24}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Typography variant="h3" gutterBottom>Tables</Typography>
      <Typography paragraph>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
        atque.
      </Typography>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Table
        title="Material UI Table"
        columns={columns}
        rows={rows}
        onDelete={handleDelete}
      />
    </Grid>
  </Grid>
)

export default Tables
