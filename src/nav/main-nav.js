import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { theme } from '../theme/theme';
import TopBar from './top-bar';
import MenuList from './menu-list';
import { mainMenuData, teamMenuData } from '../mock/menu-data';

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    overflow: 'hidden'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
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
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
};

class MainNav extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  state = {
    menuOpen: false,
    currentSection: 'Concepts'
  };

  handleMenuToggle = () => this.setState({ menuOpen: !this.state.menuOpen });

  handleMenuItemClicked = section => this.setState({ currentSection: section });

  render() {
    const { handleMenuItemClicked } = this;
    const { classes, appName, children } = this.props;
    const { menuOpen, currentSection } = this.state;

    return (
      <div className={classes.root}>
        <TopBar
          appName={appName}
          onMenuToggle={this.handleMenuToggle}
          menuOpen={menuOpen}
          currentSection={currentSection}
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
          <MenuList
            menuData={mainMenuData}
            menuOpen={menuOpen}
            onItemClicked={handleMenuItemClicked}
          />
          <Divider />
          <MenuList
            menuData={teamMenuData}
            menuOpen={menuOpen}
            onItemClicked={handleMenuItemClicked}
          />
        </Drawer>
        {children}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainNav);
