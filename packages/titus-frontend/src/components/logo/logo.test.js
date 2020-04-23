import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Logo from '.'

describe('<Logo />', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    const { asFragment } = render(<Logo />)
    expect(asFragment()).toMatchSnapshot()
  })
})
