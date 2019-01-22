import React from 'react'
import { Table } from '@nearform/titus-components'
import { PageHeading } from '../utils'
import { columns, rows } from './mock/dessert-nutrients'
import { Grid } from '@material-ui/core'

const MORE_INFO = 'More info dialog content'
const SUB_HEADER = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.'

const handleDelete = selected => {
  alert(selected.map(({ rowData: [, { data }] }) => data))
}

const Tables = () => (
  <Grid container spacing={24}>
    <PageHeading header="Tables" subHeader={SUB_HEADER} moreInfo={MORE_INFO}/>
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
