import PropTypes from 'prop-types'
import React from 'react'
import { Info } from '@material-ui/icons'
import { Typography, withStyles } from '@material-ui/core'

const styles = () => ({
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
  }
})

const MoreInfo = ({ classes }) => (
  <div className={classes.moreInfo} onClick={() => alert('You will see more info here!')}>
    <Info/>
    <Typography>More Info</Typography>
  </div>
)

MoreInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MoreInfo)
