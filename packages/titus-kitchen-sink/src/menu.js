import React from 'react'
import { ListItemLink } from '@nearform/titus-components'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import DashboardIcon from '@material-ui/icons/Dashboard'
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import InsertChart from '@material-ui/icons/InsertChart'
import TablesIcon from '@material-ui/icons/GridOn'
import AutocompleteIcon from '@material-ui/icons/Input'
import ApiIcon from '@material-ui/icons/CloudQueue'
import SearchIcon from '@material-ui/icons/FindInPage'
import CommentIcon from '@material-ui/icons/Comment'
import AuthIcon from '@material-ui/icons/LockOpen'

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
    <ListItemLink to={'/tables'}>
      <ListItemIcon>
        <TablesIcon />
      </ListItemIcon>
      <ListItemText primary='Tables' />
    </ListItemLink>
    <ListItemLink to={'/autocomplete'}>
      <ListItemIcon>
        <AutocompleteIcon />
      </ListItemIcon>
      <ListItemText primary='Autocomplete' />
    </ListItemLink>
    <ListItemLink to={'/api'}>
      <ListItemIcon>
        <ApiIcon />
      </ListItemIcon>
      <ListItemText primary='API' />
    </ListItemLink>
    <ListItemLink to={'/search'}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary='Search' />
    </ListItemLink>
    <ListItemLink to={'/comments'}>
      <ListItemIcon>
        <CommentIcon />
      </ListItemIcon>
      <ListItemText primary='COMMENTS' />
    </ListItemLink>
    <ListItemLink to={'/authorization'}>
      <ListItemIcon>
        <AuthIcon />
      </ListItemIcon>
      <ListItemText primary='Authorization' />
    </ListItemLink>
  </List>
)

Menu.propTypes = {}

export default Menu
