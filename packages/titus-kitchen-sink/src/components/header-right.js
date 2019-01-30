import React from 'react'
import UserProfile from './user-profile'
import ThemeSwitcher from './theme-switcher'

const HeaderRight = props => (
  <div {...props}>
    <ThemeSwitcher />
    <UserProfile />
  </div>
)

export default HeaderRight
