import React from 'react'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import DashboardIcon from '@material-ui/icons/Dashboard'
import WizardIcon from '@material-ui/icons/PlaylistAddCheck'
import TablesIcon from '@material-ui/icons/GridOn'

import ListItemLink from '../components/list-item-link/list-item-link'

const Menu = () => (
  <List>
    <ListItemLink to={'/docs'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItemLink>
    <ListItemLink to={'/docs/wizard'}>
      <ListItemIcon>
        <WizardIcon />
      </ListItemIcon>
      <ListItemText primary='Wizard' />
    </ListItemLink>
    <ListItemLink to={'/docs/tables'}>
      <ListItemIcon>
        <TablesIcon />
      </ListItemIcon>
      <ListItemText primary='Tables' />
    </ListItemLink>
  </List>
)

Menu.propTypes = {}

export default Menu
