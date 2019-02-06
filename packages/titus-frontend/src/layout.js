import React from 'react'
import UserProfile from './components/user-profile'
import { Navigation } from '@nearform/titus-components'
import Routes from './routes'

const meta = {
  appName: 'Titus'
}

const Layout = () => (
  <Navigation title={meta.appName} headerRight={UserProfile}>
    <Routes />
  </Navigation>
)

export default Layout
