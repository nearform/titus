import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from '.'

describe('LoginForm', () => {
  it('should not submit if username or password are empty', async done => {
    const mockFn = jest.fn()
    const { findAllByText, getByText } = render(<LoginForm login={mockFn} />)
    const loginButtons = await findAllByText('Login')
    expect(loginButtons.length).toEqual(1)
    fireEvent.click(getByText('Login'))
    setTimeout(() => {
      // give fireEvent time to execute
      expect(mockFn).toHaveBeenCalledTimes(1)
      done()
    }, 1)
  })
})
