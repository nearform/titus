import React from 'react';
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

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleMenuOpen(e) {
    this.props.onMenuOpen(e.target.value);
  }

  handleMenuClose(e) {
    this.props.onMenuClose(e.target.value);
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <AppBar
          color="primary"
          className={classNames(
            classes.appBar,
            this.props.menuOpen && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!this.props.menuOpen}>
            <IconButton
              color="inherit"
              aria-label="Open Menu"
              onClick={this.handleMenuOpen}
              className={classNames(
                classes.menuButton,
                this.props.menuOpen && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="Close Menu"
              onClick={this.handleMenuClose}
              className={classNames(!this.props.menuOpen && classes.hide)}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {this.props.appName}
              {this.props.currentSection
                ? ' - ' + this.props.currentSection
                : null}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TopBar);
