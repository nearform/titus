import React from 'react'
import {
  renderWithAuthedRouter,
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor
} from 'lib/test-utils'

import DashboardContainer from '.'

describe('<DashboardContainer />', () => {
  it('renders without crashing', async () => {
    const { getByText } = render(<DashboardContainer />)
    expect(getByText(/develop and deploy/i)).toBeInTheDocument()
    expect(getByText(/logout/i)).toBeInTheDocument()
    const docsLink = getByText(/check out the docs/i)
    expect(docsLink.getAttribute('href')).toBe('https://nf-titus.netlify.com/')
  })

  it('renders in another language (Romanian) when selected', async () => {
    const { getByLabelText, getByText } = render(<DashboardContainer />)
    const languageSelect = getByLabelText('Language:')
    fireEvent.change(languageSelect, { target: { value: 'ro' } })
    expect(getByText(/iesire/i)).toBeInTheDocument()
    fireEvent.change(languageSelect, { target: { value: 'en' } })
    expect(getByText(/logout/i)).toBeInTheDocument()
  })

  it('logs out when logout is clicked', async () => {
    const { getByText } = renderWithAuthedRouter(<DashboardContainer />)
    await waitForElementToBeRemoved(() => getByText('loading'))
    fireEvent.click(getByText(/logout/i))
    await waitFor(() => {
      expect(getByText(/login/i)).toBeInTheDocument()
    })
  })
})
