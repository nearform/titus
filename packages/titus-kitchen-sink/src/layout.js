import React from 'react'
import UserProfile from './components/user-profile/user-profile'
import { Navigation } from '@nearform/titus-components'
import Menu from './menu'
import Routes from './routes'
const meta = {
  appName: 'Titus Docs and Examples'
}
export const Layout = props => {
  return (
    <Navigation title={meta.appName} items={<Menu />} headerRight={UserProfile}>
      <Routes />
    </Navigation>
  )
}

export default Layout
