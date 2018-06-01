import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mainMenuItems, teamMembers } from '../mock/menuData';
import { theme } from '../theme/theme';
import TopBar from './TopBar';

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

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      currentSection: 'Concepts'
    };
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleMenuOpen = () => {
    this.setState({ menuOpen: true });
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <TopBar
          appName={this.props.appName}
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
          <List color="inherit">{mainMenuItems}</List>
          <Divider />
          <List color="inherit">{teamMembers}</List>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
}

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainNav);
