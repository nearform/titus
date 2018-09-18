import React from 'react'
import { storiesOf } from '@storybook/react'
import Face from '@material-ui/icons/Face'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Dashboard from '@material-ui/icons/Dashboard'

import Navigation from '../navigation'

function DrawerItems () {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText>
          navigation link
        </ListItemText>
      </ListItem>
    </List>
  )
}

function HeaderRight (props) {
  return (
    <div {...props} style={{marginRight: 10}}>
      <Face />
    </div>
  )
}

function NavigationContent () {
  return (
    <div>navigation content</div>
  )
}

storiesOf('Navigation', module)
  .add('default', () => (
    <Navigation
      title="Sample navigation"
      items={<DrawerItems />}
      headerRight={HeaderRight}
    >
      <NavigationContent />
    </Navigation>
  ))