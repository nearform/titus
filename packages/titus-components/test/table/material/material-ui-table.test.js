import React from 'react'
import { shallow } from 'enzyme'
import cloneDeep from 'lodash/cloneDeep'
import Checkbox from '@material-ui/core/Checkbox'
import MaterialUiTable from '../../../src/table/material/material-ui-table'
import { columns, rowsWithRowData} from '../__mock__/data'

import {
  TableHeaderRow as NfTableHeaderRow,
  TableHeader as NfTableHeader
} from '@nearform/react-table'

import TableToolbar from '../../../src/table/material/table-toolbar'

describe('Table Material MaterialUiTable', () => {
  describe('rendering', () => {
    test('The numSelected is partial', () => {
      const wrapper = shallow(<MaterialUiTable
        selecting={['some']}
        columns={columns}
        rows={rowsWithRowData}
        total={2}
        pageSize={2}
      />)

      expect(wrapper.find(TableToolbar).prop('numSelected')).toBe(1)
    })

    test('The numSelected is partial', () => {
      const wrapper = shallow(<MaterialUiTable
        selecting={['all']}
        columns={columns}
        rows={rowsWithRowData}
        total={2}
        pageSize={2}
      />)

      expect(wrapper.find(TableToolbar).prop('numSelected')).toBe(2)
    })

    test('Add only the headers with accessor defined', () => {
      const newColumns = cloneDeep(columns)
      delete newColumns[1].accessor
      const wrapper = shallow(<MaterialUiTable
        selecting={['all']}
        columns={newColumns}
        rows={rowsWithRowData}
        total={2}
        pageSize={2}
      />)

      expect(wrapper.find(NfTableHeader).at(1).prop('accessor')).toBe('name')
      expect(wrapper.find(NfTableHeader).at(2).prop('accessor')).toBe('fat')
      expect(wrapper.find(NfTableHeader).at(3).prop('accessor')).toBe('carbs')
      expect(wrapper.find(NfTableHeader).at(4).prop('accessor')).toBe('protein')
      expect(wrapper.find(Checkbox).at(1).prop('value')).toBe('key-1')
      expect(wrapper.find(Checkbox).at(2).prop('value')).toBe('key-2')
      expect(wrapper.find(Checkbox).at(3).prop('value')).toBe('key-3')
    })
  })

  describe('Actions', () => {
    test('handle delete', () => {
      const mockOnDelete = jest.fn()
      const wrapper = shallow(<MaterialUiTable
        selecting={['all']}
        columns={columns}
        rows={rowsWithRowData}
        total={2}
        pageSize={2}
        onDelete={mockOnDelete}
      />)

      wrapper.instance().handleDelete()
      expect(mockOnDelete).toHaveBeenCalledWith([rowsWithRowData[2]])
    })
    test('handle row select', () => {
      const mockRowSelect = jest.fn()
      const wrapper = shallow(<MaterialUiTable
        selecting={['all']}
        columns={columns}
        rows={rowsWithRowData}
        total={2}
        pageSize={2}
        handleRowSelect={mockRowSelect}
      />)

      wrapper.instance().handleRowSelect({target: {value: 'key-1'}})
      expect(mockRowSelect).toHaveBeenCalledWith('key-1')
    })

    test('handle change page', () => {
      const mockChangePage = jest.fn()
      const wrapper = shallow(<MaterialUiTable
        selecting={['all']}
        columns={columns}
        rows={rowsWithRowData}
        total={2}
        pageSize={2}
        handlePageChangeBlur={mockChangePage}
      />)

      wrapper.instance().handleChangePage({target: {value: 1}}, 2)
      expect(mockChangePage).toHaveBeenCalledWith({target: {value: 3}})

      mockChangePage.mockClear()
      wrapper.instance().handleChangePage()
      expect(mockChangePage).not.toHaveBeenCalled()
    })
  })
})
