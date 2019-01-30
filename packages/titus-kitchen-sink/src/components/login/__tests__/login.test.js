import React from 'react'
import { render, fireEvent, cleanup, wait } from 'react-testing-library'

import Login from '../login'
import { AuthContext } from '../../authentication'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Login form', () => {
  it('should be defined', () => {
    expect(Login).toBeDefined()
  })

  it("Validation: doesn't submit if username or password are empty", async () => {
    const mockFn = jest.fn()
    const { container } = render(<Login submitLogin={mockFn} />)

    const form = container.querySelector('form')
    const btn = form.querySelector('button')

    // clicking on Login button
    fireEvent.click(btn)

    await wait(() => {
      expect(mockFn).toHaveBeenCalledTimes(0)
    })
  })

  it('Validation: submitLogin fn gets executed when clicking Login and the username/password are not empty', async () => {
    const login = jest.fn()
    const { container } = render(
      <AuthContext.Provider value={{ login }}>
        <Login />
      </AuthContext.Provider>
    )

    const form = container.querySelector('form')
    const btn = form.querySelector('button')

    // setting some value for username and password
    form.querySelectorAll('input').forEach(input => {
      fireEvent.change(input, { target: { value: 'hunter2' } })
    })

    // clicking on Login button
    fireEvent.click(btn)

    await wait(() => {
      expect(login).toHaveBeenCalledTimes(1)
    })
  })
})
