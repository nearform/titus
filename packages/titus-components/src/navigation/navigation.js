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
    height: '100vh',
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
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    overflowY: 'auto',
    padding: theme.spacing.unit * 3,
    flex: 1
  },

  headerRight: {
    marginLeft: 'auto'
  }
})

export class Navigation extends Component {
  static propTypes = {
    /** The title to display on the top toolbar. */
    title: PropTypes.string.isRequired,
    /** Classes provided by the Material-UI styling infrastructure, for internal use. */
    classes: PropTypes.object.isRequired,
    /** Theme provided by the Material-UI styling infrastructure, for internal use. */
    theme: PropTypes.object.isRequired,
    /** The menu items to display on the left drawer. */
    items: PropTypes.node.isRequired,
    /** The content to display in the content area. */
    children: PropTypes.node.isRequired,
    /** A function which renders the elements displayed in the right area of the top toolbar. */
    headerRight: PropTypes.func
  }

  state = {
    menuOpen: false
  }

  handleMenuOpen = () => this.setState({ menuOpen: true })
  handleMenuClose = () => this.setState({ menuOpen: false })

  render() {
    const { handleMenuOpen, handleMenuClose } = this
    const {
      classes,
      title,
      children,
      items,
      theme,
      headerRight: HeaderRight
    } = this.props
    const { menuOpen } = this.state

    return (
      <div className={classes.root}>
        <AppBar
          color="primary"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: menuOpen
          })}
          data-testid="app-bar"
        >
          <Toolbar disableGutters={!menuOpen}>
            <IconButton
              color="inherit"
              aria-label="Open Menu"
              onClick={handleMenuOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: menuOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {title}
            </Typography>

            {HeaderRight && <HeaderRight className={classes.headerRight} />}
          </Toolbar>
        </AppBar>
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
          onClick={handleMenuClose}
          data-testid="app-bar-drawer"
        >
          <div className={classes.toolbar}>
            <IconButton>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon data-testid="app-bar-drawer-icon-right" />
              ) : (
                <ChevronLeftIcon data-testid="app-bar-drawer-icon-left" />
              )}
            </IconButton>
          </div>
          <Divider />
          {items}
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <main className={classes.main}>{children}</main>
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Navigation)
