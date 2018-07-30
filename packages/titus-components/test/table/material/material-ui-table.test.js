import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import cloneDeep from 'lodash/cloneDeep'
import MaterialUiTable from '../../../src/table/material/material-ui-table'
import { columns, rowsWithRowData } from '../__mock__/data'

describe('Table Material MaterialUiTable', () => {
  describe('rendering', () => {
    test('The numSelected is empty', () => {
      const { container } = render(
        <MaterialUiTable
          selecting={['']}
          columns={columns}
          rows={rowsWithRowData}
          total={2}
          pageSize={2}
        />
      )

      let total = 0
      container.querySelectorAll('thead tr th span').forEach(item => {
        total += (item.getAttribute('class') || '').includes('MuiCheckbox-checked')
          ? 1
          : 0
      })
      expect(total).toBe(0)
    })

    test('The numSelected is "all"', () => {
      const { container } = render(
        <MaterialUiTable
          selecting={['all']}
          columns={columns}
          rows={rowsWithRowData}
          total={2}
          pageSize={2}
        />
      )

      let total = 0
      container.querySelectorAll('thead tr th span').forEach(item => {
        total += (item.getAttribute('class') || '').includes('MuiCheckbox-checked')
          ? 1
          : 0
      })
      expect(total).toBe(1)
    })

    test('Add only the headers with accessor defined', () => {
      const newColumns = cloneDeep(columns)
      delete newColumns[1].accessor
      const { container } = render(
        <MaterialUiTable
          selecting={['all']}
          columns={newColumns}
          rows={rowsWithRowData}
          total={2}
          pageSize={2}
        />
      )
      const columnsInTable = container.querySelectorAll('thead th')

      expect(columnsInTable[1].textContent).toBe(columns[0].label)
      expect(columnsInTable[2].textContent).toBe(columns[2].label)
      expect(columnsInTable[3].textContent).toBe(columns[4].label)
    })
  })

  describe('Actions', () => {
    test('handle delete', () => {
      const newRowData = cloneDeep(rowsWithRowData)
      const mockOnDelete = jest.fn()
      const mockRowSelect = (id) => {
        const itemFound = newRowData.find(item => item.rowKey === id)
        itemFound.selected = !itemFound.selected
      }
      const { container } = render(
        <MaterialUiTable
          selecting={['all']}
          columns={columns}
          rows={newRowData}
          total={2}
          pageSize={2}
          onDelete={mockOnDelete}
          handleRowSelect={mockRowSelect}
        />
      )
      const checkBox = container.querySelector('input[value="key-1"]')
      const deleteButton = container.querySelector('button[aria-label="Delete"]')

      fireEvent.click(checkBox)
      fireEvent.click(deleteButton)

      expect(mockOnDelete.mock.calls[0][0][0].selected).toBeTruthy()
    })

    test('handle change page', () => {
      const mockChangePage = jest.fn()
      const { container } = render(
        <MaterialUiTable
          selecting={['all']}
          columns={columns}
          rows={rowsWithRowData}
          total={2}
          pageSize={2}
          currentPage={0}
          handlePageChangeBlur={mockChangePage}
        />
      )

      const nextPageButton = container.querySelector('button[aria-label="Next Page"]')

      fireEvent.click(nextPageButton)
      expect(mockChangePage).toHaveBeenCalled()
    })
  })
})
