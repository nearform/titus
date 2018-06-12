import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import Main from '../main/main';
import TopBar from './top-bar';
// import MenuList from './menu-list';
// import { mainMenuData, teamMenuData } from '../mock/menu-data';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    overflow: 'hidden'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: theme.menuWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbarPlaceholder: {
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
});

class Navigation extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    items: PropTypes.func,
    main: PropTypes.func.isRequired
  };

  state = {
    menuOpen: false
  };

  handleMenuToggle = () => this.setState({ menuOpen: !this.state.menuOpen });

  render() {
    const { classes, title, main, items } = this.props;
    const { menuOpen } = this.state;

    return (
      <div className={classes.root}>
        <TopBar
          title={title}
          onMenuToggle={this.handleMenuToggle}
          menuOpen={menuOpen}
        />
        <Drawer
          color="primary"
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperClose]: !menuOpen
            })
          }}
          open={menuOpen}
        >
          <div className={classes.toolbarPlaceholder} />
          <Divider />
          {items({ menuOpen })}
          {/* <MenuList
            menuData={mainMenuData}
            menuOpen={menuOpen}
            onItemClicked={handleMenuItemClicked}
          />
          <Divider />
          <MenuList
            menuData={teamMenuData}
            menuOpen={menuOpen}
            onItemClicked={handleMenuItemClicked}
          /> */}
        </Drawer>
        <Main>{main({ menuOpen })}</Main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);
