import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import TableToolbar from '../../../src/table/material/table-toolbar'

describe('Table Material TableToolbar', () => {
  describe('rendering', () => {
    test('Check the default rendering', () => {
      const { container } = render(
        <TableToolbar numSelected={2} title="Toolbar title" />
      )
      expect(container.querySelector('h2').textContent).toBe('Toolbar title')
      expect(container.querySelector('h2').getAttribute('class')).toContain(
        'colorPrimary'
      )
      expect(container.querySelector('p strong').textContent).toBe('2')
    })

    test('Check the rendering with numselected === 0', () => {
      const { container } = render(
        <TableToolbar numSelected={0} title="Toolbar title" />
      )

      expect(container.querySelector('h2').textContent).toBe('Toolbar title')
      expect(container.querySelector('h2').getAttribute('class')).toContain(
        'colorInherit'
      )
      expect(container.querySelector('p strong')).toBeNull()
    })
  })

  describe('action', () => {
    test('Check the default rendering', () => {
      const mockOnDelete = jest.fn()
      const { container } = render(
        <TableToolbar
          numSelected={2}
          title="Toolbar title"
          onDelete={mockOnDelete}
        />
      )
      fireEvent.click(container.querySelector('button'))

      expect(mockOnDelete).toHaveBeenCalled()
    })
  })
})
