import React from 'react'
import { ListItemLink } from 'titus-components'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import DashboardIcon from '@material-ui/icons/Dashboard'
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import InsertChart from '@material-ui/icons/InsertChart'

const Menu = () => (
  <List>
    <ListItemLink to={'/'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItemLink>
    <ListItemLink to={'/wizard'}>
      <ListItemIcon>
        <PlaylistAddCheck />
      </ListItemIcon>
      <ListItemText primary='Wizard' />
    </ListItemLink>
    <ListItemLink to={'/visualisations'}>
      <ListItemIcon>
        <InsertChart />
      </ListItemIcon>
      <ListItemText primary='Visualisations' />
    </ListItemLink>
  </List>
)

Menu.propTypes = {
}

export default Menu
