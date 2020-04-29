import React from 'react'
import Dashboard from '.'
import { render, cleanup, fireEvent } from '@testing-library/react'

describe('<Dashboard />', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    const { asFragment } = render(
      <Dashboard authentication={{ authContext: null }} />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger button correctly', async () => {
    const { asFragment, getByText } = render(
      <Dashboard authentication={{ authContext: null }} />
    )
    const button = getByText('LOGOUT')
    fireEvent.click(button)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger href correctly', async () => {
    const { asFragment, getByText } = render(
      <Dashboard authentication={{ authContext: null }} />
    )
    const href = getByText('Check out the docs')
    fireEvent.click(href)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    const authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment } = render(
      <Dashboard authentication={{ authContext }} />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    localStorage.setItem('token', 'token-01')
    const authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment } = render(
      <Dashboard authentication={{ authContext }} />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger fetch success correctly', () => {
    localStorage.setItem('token', 'token-01')
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          userPrincipalName: 'name'
        })
      })
    )
    window.alert = () => jest.fn()
    const authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment, getByText } = render(
      <Dashboard authentication={{ authContext }} />
    )
    const button = getByText('Test Azure Authentication')
    fireEvent.click(button)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger fetch catch correctly', () => {
    localStorage.setItem('token', 'token-02')
    window.fetch = jest.fn().mockImplementation(() => Promise.reject('error'))
    global.console.log = jest.fn()
    const authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment, getByText } = render(
      <Dashboard authentication={{ authContext }} />
    )
    const button = getByText('Test Azure Authentication')
    fireEvent.click(button)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })
})
