import React from 'react'
import { shallow } from 'enzyme'
import { Table as NfTable } from '@nearform/react-table'

import { columns, rows } from './__mock__/data'
import Table from '../../src/table/table'
import MaterialUiTable from '../../src/table/material/material-ui-table'

describe('Table', () => {
  describe('rendering', () => {
    test('Check the NfTable props', () => {
      const wrapper = shallow(
        <Table
          columns={columns}
          rows={rows}
          title='Material UI Table'
          pageSize={5}
          pageSizeOptions={[5, 10, 15]}
        />
      )

      const tableComponent = wrapper.find(NfTable)

      expect(tableComponent.props().columns).toEqual(columns)
      expect(tableComponent.props().data).toEqual(rows)
      expect(tableComponent.props().pageSize).toEqual(5)
      expect(tableComponent.props().pageSizeOptions).toEqual([5, 10, 15])
    })

    test('Check the NfTable props', () => {
      const wrapper = shallow(
        <Table
          columns={columns}
          rows={rows}
          title='Material UI Table'
          pageSize={5}
          pageSizeOptions={[5, 10, 15]}
        />
      ).dive()

      const tableComponent = wrapper.find(MaterialUiTable)

      expect(tableComponent.props().columns.length).toEqual(columns.length)
      expect(tableComponent.props().data.length).toEqual(rows.length)
      expect(tableComponent.props().title).toEqual('Material UI Table')
      expect(tableComponent.props().pageSize).toEqual(5)
      expect(tableComponent.props().pageSizeOptions).toEqual([5, 10, 15])
    })
  })
})
