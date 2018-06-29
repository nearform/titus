import React from 'react'
import { render } from 'react-testing-library'
import Dashboard from './dashboard'

describe('<Dashboard />', () => {
  it('displays a basic dashboard', () => {
    const { container } = render(<Dashboard />)

    expect(container).toMatchSnapshot()
  })
})
