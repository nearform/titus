import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Table from '@material-ui/core/Table'
import SortingHeaderCell from '../../../src/table/material/sorting-header-cell'

describe('Table Material SortingHeaderCell', () => {
  describe('rendering', () => {
    test('Check the default rendering', () => {
      const { container } = render(
        <Table>
          <tbody>
            <tr>
              <SortingHeaderCell>
                <div id='mock-header' />
              </SortingHeaderCell>
            </tr>
          </tbody>
        </Table>
      )
      expect(container.querySelector('div#mock-header')).not.toBeNull()
      expect(container.querySelector('tr td').getAttribute('aria-sort')).toBe('ascending')
    })
    test('The sorting is ascending', () => {
      const { container } = render(
        <Table>
          <tbody>
            <tr>
              <SortingHeaderCell isSorting={{ asc: true }}>
                <div id='mock-header' />
              </SortingHeaderCell>
            </tr>
          </tbody>
        </Table>
      )
      expect(container.querySelector('div#mock-header')).not.toBeNull()
      expect(container.querySelector('tr td').getAttribute('aria-sort')).toBe('ascending')
    })

    test('The sorting is descending', () => {
      const { container } = render(
        <Table>
          <tbody>
            <tr>
              <SortingHeaderCell isSorting={{ desc: true }}>
                <div id='mock-header' />
              </SortingHeaderCell>
            </tr>
          </tbody>
        </Table>
      )
      expect(container.querySelector('div#mock-header')).not.toBeNull()
      expect(container.querySelector('tr td').getAttribute('aria-sort')).toBe('descending')
    })
  })

  describe('actions', () => {
    test('click the sort button', () => {
      const mockOnClick = jest.fn()
      const { container } = render(
        <Table>
          <tbody>
            <tr>
              <SortingHeaderCell isSorting={{ desc: true }} onClick={mockOnClick}>
                <div id='mock-header' />
              </SortingHeaderCell>
            </tr>
          </tbody>
        </Table>
      )

      fireEvent.click(container.querySelector('span[role="button"]'))
      expect(mockOnClick).toHaveBeenCalled()
    })
  })
})
