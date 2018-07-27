import React from 'react'
import { mount } from 'enzyme'
import Table from '@material-ui/core/Table'
import SortingHeaderCell from '../../../src/table/material/sorting-header-cell'

describe('Table Material SortingHeaderCell', () => {
  describe('rendering', () => {
    test('Check the default rendering', () => {
      const wrapper = mount(
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
      expect(wrapper.find('div#mock-header').length).toBe(1)
      expect(wrapper.find('tr td').prop('aria-sort')).toBe('ascending')
    })
    test('The sorting is ascending', () => {
      const wrapper = mount(
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
      expect(wrapper.find('div#mock-header').length).toBe(1)
      expect(wrapper.find('tr td').prop('aria-sort')).toBe('ascending')
    })

    test('The sorting is descending', () => {
      const wrapper = mount(
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
      expect(wrapper.find('div#mock-header').length).toBe(1)
      expect(wrapper.find('tr td').prop('aria-sort')).toBe('descending')
    })
  })

  describe('actions', () => {
    test('click the sort button', () => {
      const mockOnClick = jest.fn()
      const wrapper = mount(
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
      wrapper.find('TableSortLabel').simulate('click')
      expect(mockOnClick).toHaveBeenCalled()
    })
  })
})
