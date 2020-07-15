import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Login from './index'

describe('<Login />', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    const { asFragment } = render(<Login />)
    expect(asFragment()).toMatchSnapshot()
  })
})
