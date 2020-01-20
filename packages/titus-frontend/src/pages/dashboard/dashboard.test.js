import React from 'react'
import Dashboard from '.'
import { render, cleanup, fireEvent } from '@testing-library/react'

describe('<Dashboard />', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    const { asFragment } = render(<Dashboard />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger button correctly', async () => {
    const { asFragment, getByText } = render(<Dashboard />)
    const button = getByText('LOGOUT')
    fireEvent.click(button)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger href correctly', async () => {
    const { asFragment, getByText } = render(<Dashboard />)
    const href = getByText('Check out the docs')
    fireEvent.click(href)

    expect(asFragment()).toMatchSnapshot()
  })
})
