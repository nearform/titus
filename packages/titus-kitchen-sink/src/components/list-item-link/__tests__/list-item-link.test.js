import React from 'react'
import { render } from 'react-testing-library'

describe('ListItemLink', () => {
  describe('rendering', () => {
    test('Default rendering', () => {
      jest.mock(
        '@reach/router',
        () => ({
          Link: () => <div data-testid="custom-link"/>
        }),
        { virtual: true }
      )
      const ListItemLink = require('../list-item-link')
        .default
      const { getByTestId } = render(<ListItemLink/>)

      expect(getByTestId('custom-link')).not.toBeNull()
    })
  })
})
