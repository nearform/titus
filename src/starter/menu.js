import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

import ListItemLink from '../components/list-item-link/list-item-link';

const Menu = () => (
  <List>
    <ListItemLink to={'/app'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemLink>
  </List>
);

Menu.propTypes = {
  menuOpen: PropTypes.bool
};

export default Menu;
