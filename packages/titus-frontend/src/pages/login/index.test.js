import React from 'react'
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent
} from '@testing-library/react'
import App from '../../app'
import Login from './index'

describe('<Login />', () => {
  afterEach(cleanup)

  it('renders without crashing', () => {
    const { asFragment } = render(<Login />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('shows required field errors', async () => {
    const { getByText } = render(<Login />)

    fireEvent.click(getByText(/login/i))
    await waitFor(() => {
      expect(getByText(/username is required/i))
      expect(getByText(/password is required/i))
    })
  })

  it('shows password requirements when password is inadequate', async () => {
    const { getByText, getByLabelText } = render(<Login />)

    const password = getByLabelText('Password:')
    fireEvent.change(password, { target: { value: 'Bar' } })
    fireEvent.click(getByText(/login/i))
    let error
    await waitFor(() => {
      error = getByText(/password must be/i)
    })
    fireEvent.change(password, { target: { value: 'Bar6' } })
    fireEvent.click(getByText(/login/i))
    await waitForElementToBeRemoved(error)
  })

  it('Login is successful', async () => {
    // Rendering at the app level so that we can see the route change
    const { getByText, getByLabelText, queryByText } = render(<App />)
    await waitFor(() => {
      getByText(/login/i)
    })

    fireEvent.change(getByLabelText('Username:'), { target: { value: 'Foo' } })
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'Bar6' } })
    expect(queryByText(/username is required/i)).not.toBeInTheDocument()
    expect(queryByText(/password is required/i)).not.toBeInTheDocument()

    fireEvent.click(getByText(/login/i))
    await waitFor(() => {
      getByText(/logout/i)
    })
  })
})
