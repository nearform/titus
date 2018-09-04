import React from 'react'

import UserProfile from '../user-profile/user-profile'
import ThemeSwitcher from '../theme-switcher/theme-switcher'

const HeaderRight = props => (
  <div {...props}>
    <ThemeSwitcher />
    <UserProfile />
  </div>
)

export default HeaderRight
