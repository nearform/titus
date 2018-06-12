import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
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
  }
  // toolbar: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: '0 8px',
  //   ...theme.mixins.toolbar
  // }
});

class TopBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    menuOpen: PropTypes.bool
  };

  handleMenuToggle = ({ target: { value } }) => this.props.onMenuToggle(value);

  render() {
    const { classes, menuOpen, title } = this.props;

    return (
      <AppBar
        color="primary"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: menuOpen
        })}
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
          <Typography variant="title" color="inherit" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TopBar);
