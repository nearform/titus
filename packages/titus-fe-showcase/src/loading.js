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

const Loading = ({ error, timedOut, retry, pastDelay, classes }) => {
  if (error) {
    console.error(error)
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    )
  } else if (timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={retry}>Retry</button>
      </div>
    )
  } else if (pastDelay) {
    return (
      <div className={classes.progressWrapper}>
        <CircularProgress className={classes.progress} />
      </div>
    )
  }

  return null
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  timedOut: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
  pastDelay: PropTypes.bool.isRequired,
  error: PropTypes.object
}

export default withStyles(styles)(Loading)
