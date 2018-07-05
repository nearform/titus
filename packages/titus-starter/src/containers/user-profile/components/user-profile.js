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
    margin: '0 12px 0 auto'
  },

  content: {
    color: 'white',
    textTransform: 'initial',
    display: 'flex',
    flexDirection: 'column'
  },

  avatar: {
    width: '40px',
    height: '40px'
  },

  profileContent: {
    padding: '12px'
  },

  userName: {
    fontWeight: 'bold'
  }
})

class UserProfile extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
    onLogOut: PropTypes.func.isRequired
  }

  state = {
    anchorEl: null
  }

  constructor (props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler (e) {
    if (this.state.anchorEl) {
      this.setState({anchorEl: null})
    } else {
      this.setState({ anchorEl: e.currentTarget })
    }
  }

  render () {
    const { className, classes, user, onLogOut } = this.props
    const { anchorEl } = this.state

    return (
      <Button className={classNames(className, classes.root)} onClick={this.clickHandler} title={user.username}>
        <div className={classes.content}>
          {
            user.avatar
              ? <Avatar alt={user.username} src={user.avatar} className={classes.avatar} />
              : <FaceIcon className={classes.avatar} />
          }
        </div>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
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
            <p>Some custom content about <span className={classes.userName} >{user.username}</span></p>
            <Button onClick={onLogOut}>Logout</Button>
          </div>
        </Popover>

      </Button >
    )
  }
}

export default withStyles(styles, { withTheme: true })(UserProfile)
