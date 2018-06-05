import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { mainMenuData } from '../mock/menuData';
import { mainMenuIcons } from '../assets/navIcons';
import { SvgIcon } from '@material-ui/core';

const styles = {
  root: {}
};

class MainMenuList extends Component {
  render() {
    const { classes, renderAs } = this.props;

    const listItems = [];
    mainMenuData.forEach(menuItem => {
      const Icon = mainMenuIcons[menuItem.id];
      const listItem = (
        <ListItem key={menuItem.id} button>
          <ListItemIcon>
            {menuItem.notifications > 0 ? (
              <Badge badgeContent={menuItem.notifications} color="secondary">
                <Icon />
              </Badge>
            ) : (
              <Icon />
            )}
          </ListItemIcon>
          <ListItemText primary={menuItem.name} />
        </ListItem>
      );

      listItems.push(listItem);
    });

    return <div className={classes.root}>{listItems}</div>;
  }
}

MainMenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainMenuList);
