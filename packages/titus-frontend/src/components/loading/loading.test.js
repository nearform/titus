import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Loading from './loading'

describe('<Loading />', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    const { asFragment } = render(<Loading />)
    expect(asFragment()).toMatchSnapshot()
  })
})
