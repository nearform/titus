import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { theme } from '../theme/theme';
import TopBar from './TopBar';
import MenuList from './MenuList';
import { mainMenuData, teamMenuData } from '../mock/menuData';

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
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      currentSection: 'Concepts'
    };
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMainMenuItemClicked = this.handleMainMenuItemClicked.bind(this);
    this.handleTeamMenuItemClicked = this.handleTeamMenuItemClicked.bind(this);
  }

  handleMenuOpen = () => {
    this.setState({ menuOpen: true });
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: false });
  };

  handleMainMenuItemClicked = section => {
    this.setState({ currentSection: section });
  };

  handleTeamMenuItemClicked = section => {
    this.setState({ currentSection: section });
  };

  render() {
    const { classes, appName, children } = this.props;

    return (
      <div className={classes.root}>
        <TopBar
          appName={appName}
          onMenuOpen={this.handleMenuOpen}
          onMenuClose={this.handleMenuClose}
          menuOpen={this.state.menuOpen}
          currentSection={this.state.currentSection}
        />
        <Drawer
          color="primary"
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.menuOpen && classes.drawerPaperClose
            )
          }}
          open={this.state.openMenu}
        >
          <div className={classes.toolbarPlaceholder} />
          <Divider />
          <MenuList
            menuData={mainMenuData}
            menuOpen={this.state.menuOpen}
            onItemClicked={this.handleMainMenuItemClicked}
          />
          <Divider />
          <MenuList
            menuData={teamMenuData}
            menuOpen={this.state.menuOpen}
            onItemClicked={this.handleTeamMenuItemClicked}
          />
        </Drawer>
        {children}
      </div>
    );
  }
}

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainNav);
