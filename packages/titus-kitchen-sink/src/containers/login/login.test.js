import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { Login } from './login'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Login form', () => {
  it('should be defined', () => {
    expect(Login).toBeDefined()
  })

  it('Validation: doesn\'t submit if username or password are empty', () => {
    const mockFn = jest.fn()
    const { container } = render(<Login submitLogin={mockFn} />)

    const form = container.querySelector('form')
    const btn = form.querySelector('button')

    // clicking on Login button
    fireEvent.click(btn)

    expect(mockFn).toHaveBeenCalledTimes(0)
  })

  it('Validation: submitLogin fn gets executed when clicking Login and the username/password are not empty', () => {
    const mockFn = jest.fn()
    const { container } = render(<Login submitLogin={mockFn} />)

    const form = container.querySelector('form')
    const btn = form.querySelector('button')

    // setting some value for username and password
    form.querySelectorAll('input').forEach(input => {
      input.value = 'hunter2'
    })

    // clicking on Login button
    fireEvent.click(btn)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
