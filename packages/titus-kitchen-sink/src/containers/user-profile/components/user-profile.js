import React, { PureComponent } from 'react'
import FaceIcon from '@material-ui/icons/Face'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

import Popover from '@material-ui/core/Popover'

import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

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

  avatar: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: 0,
    left: 0
  },

  profileContent: {
    padding: '12px'
  },

  userName: {
    fontWeight: 'bold',
    color: '#369'
  }
})

class UserProfile extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
    onLogOut: PropTypes.func
  }

  state = {
    open: false
  }

  anchorEl = React.createRef()

  clickHandler = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { className, classes, user, onLogOut } = this.props
    const { open } = this.state

    return (
      <div ref={this.anchorEl} className={classNames(className, classes.root)}>
        <Button onClick={this.clickHandler} title={user.username} color='inherit'>
          <div className={classes.content}>
            {/* the FaceIcon is the fallback, should the avatar image not be available or defined */}
            <FaceIcon className={classes.dummyImage} />
            <Avatar alt={user.username} src={user.avatar} className={classes.avatar} />
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
              <p>Hello <span className={classes.userName} >{user.username}</span>!</p>
              <p>City: {user.city}</p>
              <p>Dob: {user.dob}</p>
              <Button onClick={onLogOut}>Logout</Button>
            </div>
          </Popover>
        </Button >
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(UserProfile)
