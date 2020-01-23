import React from 'react'
import Dashboard from '.'
import { render, cleanup, fireEvent } from '@testing-library/react'
import * as context from '../../components/auth-providers/azure-ad/adalConfig'

describe('<Dashboard />', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    context.authContext = null
    const { asFragment } = render(<Dashboard />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger button correctly', async () => {
    context.authContext = null
    const { asFragment, getByText } = render(<Dashboard />)
    const button = getByText('LOGOUT')
    fireEvent.click(button)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger href correctly', async () => {
    context.authContext = null
    const { asFragment, getByText } = render(<Dashboard />)
    const href = getByText('Check out the docs')
    fireEvent.click(href)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    context.authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment } = render(<Dashboard />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    localStorage.setItem('token', 'token-01')
    context.authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment } = render(<Dashboard />)

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
    context.authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment, getByText } = render(<Dashboard />)
    const button = getByText('Test Azure Authentication')
    fireEvent.click(button)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger fetch catch correctly', () => {
    localStorage.setItem('token', 'token-02')
    window.fetch = jest.fn().mockImplementation(() => Promise.reject('error'))
    global.console.log = jest.fn()
    context.authContext = {
      CONSTANTS: {
        STORAGE: {
          IDTOKEN: 'token'
        }
      }
    }
    const { asFragment, getByText } = render(<Dashboard />)
    const button = getByText('Test Azure Authentication')
    fireEvent.click(button)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })
})
