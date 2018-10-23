import React from 'react'
import { render } from 'react-testing-library'

import { columns, rows } from './__mock__/data'
import Table from '../../src/table/table'

describe('Table', () => {
  describe('rendering', () => {
    test('Check rendering values', () => {
      const { container } = render(
        <Table
          columns={columns}
          rows={rows}
          title="Material UI Table"
          pageSize={5}
          pageSizeOptions={[5, 10, 15]}
        />
      )

      expect(container.querySelector('h6').textContent).toBe(
        'Material UI Table'
      )
      expect(container.querySelectorAll('th[scope="col"]').length).toBe(5)
      expect(container.querySelectorAll('tbody tr').length).toBe(6)
    })
  })
})
