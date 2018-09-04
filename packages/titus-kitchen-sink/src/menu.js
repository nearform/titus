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
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import AuthIcon from '@material-ui/icons/LockOpen'

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
        <ListItemText primary='Dashboard' />
      </ListItemLink>
      <ListItemLink to={'/wizard'} getProps={isActiveRoute}>
        <ListItemIcon>
          <PlaylistAddCheck />
        </ListItemIcon>
        <ListItemText primary='Wizard' />
      </ListItemLink>
      <ListItemLink to={'/visualisations'} getProps={isActiveRoute}>
        <ListItemIcon>
          <InsertChart />
        </ListItemIcon>
        <ListItemText primary='Visualisations' />
      </ListItemLink>
      <ListItemLink to={'/tables'} getProps={isActiveRoute}>
        <ListItemIcon>
          <TablesIcon />
        </ListItemIcon>
        <ListItemText primary='Tables' />
      </ListItemLink>
      <ListItemLink to={'/autocomplete'} getProps={isActiveRoute}>
        <ListItemIcon>
          <AutocompleteIcon />
        </ListItemIcon>
        <ListItemText primary='Autocomplete' />
      </ListItemLink>
      <ListItemLink to={'/api'} getProps={isActiveRoute}>
        <ListItemIcon>
          <ApiIcon />
        </ListItemIcon>
        <ListItemText primary='API' />
      </ListItemLink>
      <ListItemLink to={'/search'} getProps={isActiveRoute}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary='Search' />
      </ListItemLink>
      <ListItemLink to={'/comments'} getProps={isActiveRoute}>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary='COMMENTS' />
      </ListItemLink>
      <ListItemLink to={'/uploader'} getProps={isActiveRoute}>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary='Uploader' />
      </ListItemLink>
      <ListItemLink to={'/authorization'} getProps={isActiveRoute}>
        <ListItemIcon>
          <AuthIcon />
        </ListItemIcon>
        <ListItemText primary='Authorization' />
      </ListItemLink>
    </List>
  )
}

Menu.propTypes = {}

export default Menu
