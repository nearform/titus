import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import LoginForm from '.'

describe('LoginForm', () => {
  afterEach(cleanup)

  it('should not submit if username or password are empty', async done => {
    const mockFn = jest.fn()
    const { findAllByText, getByText } = render(<LoginForm login={mockFn} />)
    const loginButtons = await findAllByText('Login')
    expect(loginButtons.length).toEqual(1)
    fireEvent.click(getByText('Login'))

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1)
      done()
    }, 1)
  })

  it('should render correctly without paramsr', async () => {
    const { asFragment } = render(<LoginForm />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with allowChangePassword and loginError', async () => {
    const { asFragment } = render(
      <LoginForm allowChangePassword={true} loginError="login error" />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
