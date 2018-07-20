import { connect } from 'react-redux'
import { logOut } from '../../store/app/app-actions'
import React, { PureComponent } from 'react'
import FaceIcon from '@material-ui/icons/Face'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

import Popover from '@material-ui/core/Popover'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: '0 12px 0',
    display: 'inline-block'
  },

  content: {
    textTransform: 'initial',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },

  dummyImage: {
    width: '40px',
    height: '40px'
  },

  profileContent: {
    padding: '12px'
  }
})

export class UserProfile extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    logOut: PropTypes.func
  }

  static defaultProps = {
    classes: {}
  }

  state = {
    open: false
  }

  anchorEl = React.createRef()

  clickHandler = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { classes, user, logOut, className } = this.props
    const { open } = this.state

    return (
      <div ref={this.anchorEl} className={classNames(className, classes.root)}>
        <Button onClick={this.clickHandler} title={user.username} color='inherit'>
          <div className={classes.content}>
            <FaceIcon className={classes.dummyImage} />
          </div>
          <Popover
            className='userProfilePopOver'
            open={open}
            anchorEl={this.anchorEl.current}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <div className={classes.profileContent}>
              <Typography variant='subheading' align='center' gutterBottom>{user.username}</Typography>
              <Button onClick={logOut}>Logout</Button>
            </div>
          </Popover>
        </Button >
      </div>
    )
  }
}

const mapStateToProps = ({ app: { user } }) => ({
  user
})

const mapDispatchToProps = {
  logOut
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(UserProfile))
