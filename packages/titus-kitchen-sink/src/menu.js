import React from 'react'
import { ListItemLink } from '@nearform/titus-components'
import { List, ListItemIcon, ListItemText } from '@material-ui/core'
import {
  Dashboard as DashboardIcon,
  PlaylistAddCheck,
  InsertChart,
  GridOn as TablesIcon,
  Input as AutocompleteIcon,
  CloudQueue as ApiIcon,
  FindInPage as SearchIcon,
  Comment as CommentIcon,
  CloudUpload as CloudUploadIcon,
  LockOpen as AuthIcon,
  AccountCircle as AccountCircleIcon
} from '@material-ui/icons'

const styles = {
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)'
  }
}

const isActiveRoute = ({ isCurrent }) => {
  return isCurrent ? { style: { ...styles.active } } : null
}

const Menu = () => {
  return (
    <List>
      <ListItemLink to={'/'} getProps={isActiveRoute}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemLink>
      <ListItemLink to={'/wizard'} getProps={isActiveRoute}>
        <ListItemIcon>
          <PlaylistAddCheck />
        </ListItemIcon>
        <ListItemText primary="Wizard" />
      </ListItemLink>
      <ListItemLink to={'/visualisations'} getProps={isActiveRoute}>
        <ListItemIcon>
          <InsertChart />
        </ListItemIcon>
        <ListItemText primary="Visualisations" />
      </ListItemLink>
      <ListItemLink to={'/tables'} getProps={isActiveRoute}>
        <ListItemIcon>
          <TablesIcon />
        </ListItemIcon>
        <ListItemText primary="Tables" />
      </ListItemLink>
      <ListItemLink to={'/autocomplete'} getProps={isActiveRoute}>
        <ListItemIcon>
          <AutocompleteIcon />
        </ListItemIcon>
        <ListItemText primary="Autocomplete" />
      </ListItemLink>
      <ListItemLink to={'/api'} getProps={isActiveRoute}>
        <ListItemIcon>
          <ApiIcon />
        </ListItemIcon>
        <ListItemText primary="API" />
      </ListItemLink>
      <ListItemLink to={'/search'} getProps={isActiveRoute}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItemLink>
      <ListItemLink to={'/comments'} getProps={isActiveRoute}>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="COMMENTS" />
      </ListItemLink>
      <ListItemLink to={'/uploader'} getProps={isActiveRoute}>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Uploader" />
      </ListItemLink>
      <ListItemLink to={'/auth'} getProps={isActiveRoute}>
        <ListItemIcon>
          <AuthIcon />
        </ListItemIcon>
        <ListItemText primary="Authorization" />
      </ListItemLink>
      <ListItemLink to={'/auth0/login'} getProps={isActiveRoute}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Auth0" />
      </ListItemLink>
    </List>
  )
}

Menu.propTypes = {}

export default Menu
