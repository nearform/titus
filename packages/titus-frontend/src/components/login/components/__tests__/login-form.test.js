import React from 'react'
import { mount } from 'enzyme'
import LoginForm from '../login-form'

let container
afterEach(() => {
  container.unmount()
})
describe('Login', () => {
  it("Validation: doesn't submit if username or password are empty", () => {
    const mockFn = jest.fn()
    container = mount(<LoginForm login={mockFn} />)
    expect(container.find('button').length).toEqual(1)
    container.find('button').simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(0)
  })
})
