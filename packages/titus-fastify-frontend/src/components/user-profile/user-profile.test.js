import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library'
import 'jest-dom/extend-expect'

import { UserProfile } from './user-profile'
import { AuthContext } from '../authentication/authentication-context'

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
    const { container } = render(
      <AuthContext.Provider value={{ user }}>
        <UserProfile />
      </AuthContext.Provider>
    )

    const btn = container.firstChild.querySelector('*>button')

    fireEvent.click(btn)

    const popover = await waitForElement(() =>
      document.querySelector('.userProfilePopOver')
    )
    expect(popover).toBeDefined()
  })
})
