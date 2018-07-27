import React from 'react'
import { mount } from 'enzyme'
import TableToolbar from '../../../src/table/material/table-toolbar'

describe('Table Material TableToolbar', () => {
  describe('rendering', () => {
    test('Check the default rendering', () => {
      const wrapper = mount(<TableToolbar numSelected={2} title='Toolbar title'/>)
      expect(wrapper.find('h2').text()).toBe('Toolbar title')
      expect(wrapper.find('h2').props().className).toContain('colorPrimary')
      expect(wrapper.find('p strong').text()).toBe('2')
    })

    test('Check the rendering with numselected === 0', () => {
      const wrapper = mount(<TableToolbar numSelected={0} title='Toolbar title'/>)
      expect(wrapper.find('h2').text()).toBe('Toolbar title')
      expect(wrapper.find('h2').props().className).toContain('colorInherit')
      expect(wrapper.find('p strong').length).toBe(0)
    })
  })

  describe('action', () => {
    test('Check the default rendering', () => {
      const mockOnDelete = jest.fn()
      const wrapper = mount(<TableToolbar numSelected={2} title='Toolbar title' onDelete={mockOnDelete}/>)
      wrapper.find('button').simulate('click')

      expect(mockOnDelete).toHaveBeenCalled()
    })
  })
})
