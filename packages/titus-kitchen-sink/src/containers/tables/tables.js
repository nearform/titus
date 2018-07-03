import React from 'react'
import { Table } from '@nearform/titus-components'
import { columns, rows } from './mock/dessert-nutrients'

const handleDelete = selected => {
  alert(selected.map(({ rowData: [, { data }] }) => data))
}

const Tables = () => (
  <Table
    title='Material UI Table'
    columns={columns}
    rows={rows}
    onDelete={handleDelete}
  />
)

export default Tables
