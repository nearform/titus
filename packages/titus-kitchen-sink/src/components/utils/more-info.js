import PropTypes from 'prop-types'
import React from 'react'
import { Info } from '@material-ui/icons'
import { Grid, Modal, Typography, withStyles } from '@material-ui/core'

const styles = theme => ({
  moreInfo: {
    cursor: 'pointer',
    alignItems: 'center',
    display: 'flex',

    '& p': {
      marginLeft: '10px'
    },

    '&:hover': {
      '& p': {
        textDecoration: 'underline'
      }
    }
  },

  moreInfoModal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    left: '50%',
    outline: 'none',
    padding: theme.spacing.unit * 4,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 50
  }
})

class MoreInfo extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  render() {
    const { classes, content, title } = this.props

    return (
      <>
        <div className={classes.moreInfo} onClick={this.handleOpen}>
          <Info />
          <Typography>More Info</Typography>
        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Grid container spacing={24} className={classes.moreInfoModal}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid
                container
                spacing={24}
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="h6" id="modal-title">
                  More information about {title}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" id="simple-modal-description">
              {content}
            </Typography>
          </Grid>
        </Modal>
      </>
    )
  }
}

MoreInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(MoreInfo)
