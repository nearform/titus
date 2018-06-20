import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DefaultIcon from '@material-ui/icons/Block'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'
import { menuIcons } from '../assets/navIcons'
import Tooltip from '@material-ui/core/Tooltip'

const styles = {
  root: {},
  smallAvatar: {
    width: 32,
    height: 32,
    fontSize: 16
  }
}

const getInitials = name => {
  var initials = name.match(/\b\w/g) || []
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
}

class MenuList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onItemClicked: PropTypes.func,
    menuData: PropTypes.object,
    menuOpen: PropTypes.bool
  }

  state = {
    lastClickedId: null
  }

  handleItemClicked = menuItemId => {
    this.props.onItemClicked(menuItemId)
    this.setState({ lastClickedId: menuItemId })
  }

  customIcon = ({ id, name }) => {
    const Icon = menuIcons[id]
    if (this.props.menuData.useAvatars) {
      return (
        <Avatar className={this.props.classes.smallAvatar}>
          {Icon ? <Icon /> : getInitials(name)}
        </Avatar>
      )
    }
    return Icon ? <Icon /> : <DefaultIcon />
  }

  render () {
    const { customIcon } = this
    const { classes, menuOpen, menuData } = this.props

    return (
      <div className={classes.root}>
        {menuData.items.map(({ id, name, description, notifications = 0 }) => (
          <ListItem
            key={id}
            button
            onClick={() => this.handleItemClicked(id)}
            selected={this.state.lastClickedId === id}
          >
            <Tooltip title={menuOpen ? '' : description} placement='bottom-end'>
              <ListItemIcon aria-label={name}>
                {notifications > 0 ? (
                  <Badge badgeContent={notifications} color='secondary'>
                    {customIcon({ id, name })}
                  </Badge>
                ) : (
                  customIcon({ id, name })
                )}
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MenuList)
