import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DefaultIcon from '@material-ui/icons/Block';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { menuIcons } from '../assets/navIcons';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {},
  smallAvatar: {
    width: 32,
    height: 32,
    fontSize: 16
  }
};

function getInitials(name) {
  var initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    };
  }

  handleItemClicked = id => {
    this.props.onItemClicked(id);
    this.setState({ selectedId: id });
  };

  render() {
    const { classes, menuOpen, menuData } = this.props;

    const listItems = [];
    menuData.items.forEach(menuItem => {
      let Icon = menuIcons[menuItem.id];

      let CustomIcon = null;
      if (menuData.useAvatars) {
        //need to create as a function to render below
        CustomIcon = () => (
          <Avatar className={classes.smallAvatar}>
            {Icon ? <Icon /> : getInitials(menuItem.name)}
          </Avatar>
        );
      } else {
        CustomIcon = Icon ? Icon : DefaultIcon;
      }

      const listItem = (
        <ListItem
          key={menuItem.id}
          button
          onClick={() => this.handleItemClicked(menuItem.id)}
          selected={this.state.lastClickedId === menuItem.id}
        >
          <Tooltip
            title={menuOpen ? '' : menuItem.description}
            placement="bottom-end"
          >
            <ListItemIcon aria-label={menuItem.name}>
              {menuItem.notifications && menuItem.notifications > 0 ? (
                <Badge badgeContent={menuItem.notifications} color="secondary">
                  <CustomIcon />
                </Badge>
              ) : (
                <CustomIcon />
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary={menuItem.name} />
        </ListItem>
      );

      listItems.push(listItem);
    });

    return <div className={classes.root}>{listItems}</div>;
  }
}

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MenuList);
