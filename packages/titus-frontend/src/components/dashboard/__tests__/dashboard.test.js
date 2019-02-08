import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from '../'

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Dashboard />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
