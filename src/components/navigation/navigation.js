import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    overflow: 'hidden'
  },
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
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
})

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

  handleMenuOpen = () => this.setState({ menuOpen: true });
  handleMenuClose = () => this.setState({ menuOpen: false });

  render () {
    const { handleMenuOpen, handleMenuClose } = this
    const { classes, title, main, items, theme } = this.props
    const { menuOpen } = this.state

    return (
      <div className={classes.root}>
        <AppBar
          color='primary'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: menuOpen
          })}
        >
          <Toolbar disableGutters={!menuOpen}>
            <IconButton
              color='inherit'
              aria-label='Open Menu'
              onClick={handleMenuOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: menuOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          color='primary'
          variant='permanent'
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperClose]: !menuOpen
            })
          }}
          open={menuOpen}
          /* any click in the drawer will propogate and close it */
          onClick={handleMenuClose}
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
        <main className={classes.main}>
          <div className={classes.toolbar} />
          {main({ menuOpen })}
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Navigation)
