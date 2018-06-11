import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { theme } from '../theme/theme';

const styles = {
  root: {},
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: theme.menuWidth,
    width: `calc(100% - ${theme.menuWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
};

class TopBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  handleMenuToggle = ({ target: { value } }) => this.props.onMenuToggle(value);

  render() {
    const { classes, menuOpen, appName, currentSection } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          color="primary"
          className={classNames(
            classes.appBar,
            menuOpen && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!menuOpen}>
            <IconButton
              color="inherit"
              aria-label="Open Menu"
              onClick={this.handleMenuToggle}
              className={classNames(classes.menuButton, {
                [classes.hide]: menuOpen
              })}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="Close Menu"
              onClick={this.handleMenuToggle}
              className={classNames({
                [classes.hide]: !menuOpen
              })}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {appName}
              {currentSection ? ' - ' + currentSection : null}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TopBar);
