import React from 'react'
import { ListItemLink } from '@nearform/titus-components'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'

const Menu = () => (
  <List>
    <ListItemLink to={'/'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemLink>
  </List>
)

Menu.propTypes = {}

export default Menu
