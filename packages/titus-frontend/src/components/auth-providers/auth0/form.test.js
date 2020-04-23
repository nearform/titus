import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Form } from './form'

describe('<Form />', () => {
  afterEach(cleanup)

  it('should render correctly when authentication and login return false', async () => {
    const authentication = {
      parseHash: () => {
        return new Promise(resolve => {
          return resolve(false)
        })
      }
    }

    const { asFragment } = render(
      <Form
        login={() => {
          return false
        }}
        authentication={authentication}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when authentication returns true and login returns false', async () => {
    const authentication = {
      parseHash: () => {
        return new Promise(resolve => {
          return resolve(true)
        })
      }
    }

    const { asFragment } = render(
      <Form
        login={() => {
          return false
        }}
        authentication={authentication}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly authentication and login return true', async () => {
    const authentication = {
      parseHash: () => {
        return new Promise(resolve => {
          return resolve(true)
        })
      }
    }

    const { asFragment } = render(
      <Form
        login={() => {
          return true
        }}
        authentication={authentication}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger button correctly', async () => {
    const authentication = {
      parseHash: () => {
        return new Promise(resolve => {
          return resolve(true)
        })
      }
    }

    const mockFn = jest.fn()

    const { asFragment, getByText } = render(
      <Form login={mockFn} authentication={authentication} />
    )
    const button = getByText('Login through Auth0')
    fireEvent.click(button)

    expect(mockFn.mock.calls.length).toBe(1)
    expect(asFragment()).toMatchSnapshot()
  })
})
