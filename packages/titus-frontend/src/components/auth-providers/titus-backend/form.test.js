import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Form } from './form'

describe('<Form />', () => {
  afterEach(cleanup)

  it('should render correctly when params not passed', async () => {
    const { asFragment } = render(<Form />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with params and no login error', async () => {
    const { asFragment } = render(<Form login={jest.fn()} loginError={false} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with params and login error', async () => {
    const { asFragment } = render(<Form login={jest.fn()} loginError={true} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
