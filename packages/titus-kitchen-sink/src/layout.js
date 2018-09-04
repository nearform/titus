import React from 'react'
import HeaderRight from './components/header-right/header-right'
import { Navigation } from '@nearform/titus-components'
import Menu from './menu'
import Routes from './routes'
const meta = {
  appName: 'Titus Docs and Examples'
}
export const Layout = props => {
  return (
    <Navigation title={meta.appName} items={<Menu />} headerRight={HeaderRight}>
      <Routes />
    </Navigation>
  )
}

export default Layout
