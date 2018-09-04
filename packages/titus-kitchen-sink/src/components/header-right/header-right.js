import React from 'react'

import UserProfile from '../user-profile/user-profile'
import { ThemeSwitcher } from '../../theme'

const HeaderRight = (props) => (
  <div {...props}>
    <ThemeSwitcher />
    <UserProfile />
  </div>
)

export default HeaderRight
