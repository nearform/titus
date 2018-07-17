import React from 'react'
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'
import UserProfile from './user-profile'
import 'jest-dom/extend-expect'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('User profile', () => {
  it('should be defined', () => {
    expect(UserProfile).toBeDefined()
  })

  it('Show popover on click', async () => {
    const user = {
      username: 'John'
    }
    const { container } = render(<UserProfile user={user} />)
    const btn = container.firstChild.querySelector('*>button')

    fireEvent.click(btn)

    const popover = await waitForElement(() => document.querySelector('.userProfilePopOver'))
    expect(popover).toBeDefined()
  })
})
