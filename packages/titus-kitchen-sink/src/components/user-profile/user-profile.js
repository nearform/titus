import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button, Typography, Popover, withStyles } from '@material-ui/core'
import { Face as FaceIcon } from '@material-ui/icons'
import { AuthContext } from '../../lib/auth'

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

export class UserProfile extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string
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
    const { classes, className } = this.props
    const { open } = this.state

    return (
      <AuthContext.Consumer>
        {({ user, logout }) => (
          <div
            ref={this.anchorEl}
            className={classNames(className, classes.root)}
          >
            <Button
              onClick={this.clickHandler}
              title={user.username}
              color='inherit'
            >
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
                  <Typography variant='subheading' align='center' gutterBottom>
                    {user.username}
                  </Typography>
                  <Button onClick={logout}>Logout</Button>
                </div>
              </Popover>
            </Button>
          </div>
        )}
      </AuthContext.Consumer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(UserProfile)
