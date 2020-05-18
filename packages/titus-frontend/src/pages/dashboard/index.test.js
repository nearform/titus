import React from 'react'
import { render, cleanup } from '@testing-library/react'
import DashboardContainer from './index'

describe('<DashboardContainer />', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    const { asFragment } = render(<DashboardContainer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
