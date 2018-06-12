import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Main from '../main/main';
import TopBar from './top-bar';

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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
});

class Navigation extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    items: PropTypes.func,
    main: PropTypes.func.isRequired
  };

  state = {
    menuOpen: false
  };

  handleMenuToggle = () => this.setState({ menuOpen: !this.state.menuOpen });

  render() {
    const { classes, title, main, items, theme } = this.props;
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
          /* any click in the drawer will propogate and close it */
          onClick={this.handleMenuToggle}
        >
          <div className={classes.toolbar}>
            <IconButton>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {items({ menuOpen })}
        </Drawer>
        <Main>{main({ menuOpen })}</Main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);
