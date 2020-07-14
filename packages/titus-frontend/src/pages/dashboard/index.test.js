import React from 'react'
import {
  renderWithAuthedRouter,
  render,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor
} from '../../test-utils'
import DashboardContainer from './index'

describe('<DashboardContainer />', () => {
  afterEach(cleanup)

  it('renders without crashing', async () => {
    const { getByText } = render(<DashboardContainer />)
    getByText(/develop and deploy/i)
    getByText(/logout/i)
    const docsLink = getByText(/check out the docs/i)
    expect(docsLink.getAttribute('href')).toBe('https://nf-titus.netlify.com/')
  })

  it('renders in another language (Romanian) when selected', async () => {
    const { getByLabelText, getByText } = render(<DashboardContainer />)
    const languageSelect = getByLabelText('Language:')
    fireEvent.change(languageSelect, { target: { value: 'ro' } })
    getByText(/iesire/i)
    fireEvent.change(languageSelect, { target: { value: 'en' } })
    getByText(/logout/i)
  })

  it('logs out when logout is clicked', async () => {
    const { getByText } = renderWithAuthedRouter(<DashboardContainer />)
    await waitForElementToBeRemoved(() => getByText('loading'))
    fireEvent.click(getByText(/logout/i))
    await waitFor(() => {
      getByText(/login/i)
    })
  })
})
