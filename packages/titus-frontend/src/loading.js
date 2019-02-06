import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, CircularProgress } from '@material-ui/core'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressWrapper: {
    margin: 'auto 50%',
    paddingBottom: theme.spacing.unit * 3
  }
})

const Loading = ({ classes }) => (
  <div className={classes.progressWrapper}>
    <CircularProgress className={classes.progress} />
  </div>
)

Loading.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(Loading)
