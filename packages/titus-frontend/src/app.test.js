import React from 'react'
import { render, cleanup } from '@testing-library/react'

import App from './app'

describe('<App />', () => {
  afterEach(cleanup)

  it('should render correctly when path is / and is not authenticated', () => {
    jest.mock('./history', () => ({
      length: 1,
      location: {
        pathname: '/'
      },
      listen: jest.fn()
    }))

    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when path is /login and is not authenticated', () => {
    jest.mock('./history', () => ({
      length: 1,
      location: {
        pathname: '/login'
      },
      listen: jest.fn()
    }))

    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when path is /login and is authenticated', () => {
    jest.mock('./history', () => ({
      length: 1,
      location: {
        pathname: '/login'
      },
      listen: jest.fn()
    }))

    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
  })
})
