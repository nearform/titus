import React from 'react'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import InsertChart from '@material-ui/icons/InsertChart'
import TablesIcon from '@material-ui/icons/GridOn'
import AutocompleteIcon from '@material-ui/icons/Input'
import ApiIcon from '@material-ui/icons/CloudQueue'
import TemporalIcon from '@material-ui/icons/Timeline'
import SearchIcon from '@material-ui/icons/Search'
import CommentIcon from '@material-ui/icons/Comment'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import AuthIcon from '@material-ui/icons/Lock'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import LanguageIcon from '@material-ui/icons/Language'

import ListItemLink from './components/list-item-link'

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
      <ListItemLink to={'/'} title="Dashboard" getProps={isActiveRoute}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemLink>
      <ListItemLink to={'/wizard'} title="Wizard" getProps={isActiveRoute}>
        <ListItemIcon>
          <PlaylistAddCheck />
        </ListItemIcon>
        <ListItemText primary="Wizard" />
      </ListItemLink>
      <ListItemLink
        to={'/visualisations'}
        titus="Visualisations"
        getProps={isActiveRoute}
      >
        <ListItemIcon>
          <InsertChart />
        </ListItemIcon>
        <ListItemText primary="Visualisations" />
      </ListItemLink>
      <ListItemLink to={'/tables'} title="Tables" getProps={isActiveRoute}>
        <ListItemIcon>
          <TablesIcon />
        </ListItemIcon>
        <ListItemText primary="Tables" />
      </ListItemLink>
      <ListItemLink
        to={'/autocomplete'}
        title="Autocomplete"
        getProps={isActiveRoute}
      >
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
      <ListItemLink to={'/temporal'} title="Temporal" getProps={isActiveRoute}>
        <ListItemIcon>
          <TemporalIcon />
        </ListItemIcon>
        <ListItemText primary="Temporal" />
      </ListItemLink>
      <ListItemLink to={'/search'} title="Search" getProps={isActiveRoute}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItemLink>
      <ListItemLink to={'/comments'} title="Comments" getProps={isActiveRoute}>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItemLink>
      <ListItemLink to={'/uploader'} title="Uploader" getProps={isActiveRoute}>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Uploader" />
      </ListItemLink>
      <ListItemLink to={'/auth'} title="Authorization" getProps={isActiveRoute}>
        <ListItemIcon>
          <AuthIcon />
        </ListItemIcon>
        <ListItemText primary="Authorization" />
      </ListItemLink>
      <ListItemLink to={'/auth0/login'} title="Auth0" getProps={isActiveRoute}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Auth0" />
      </ListItemLink>
      <ListItemLink to={'/theming'} title="Theming" getProps={isActiveRoute}>
        <ListItemIcon>
          <InvertColorsIcon />
        </ListItemIcon>
        <ListItemText primary="Theming" />
      </ListItemLink>
      <ListItemLink to={'/translations'} getProps={isActiveRoute}>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary="Translations" />
      </ListItemLink>
    </List>
  )
}

Menu.propTypes = {}

export default Menu
