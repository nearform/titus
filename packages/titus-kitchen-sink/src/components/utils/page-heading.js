import PropTypes from 'prop-types'
import React from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core'
import { MoreInfo } from './index'

const styles = () => ({
  moreInfoContainer: {
    alignSelf: 'flex-start'
  }
})

const PageHeading = ({ classes, header, subHeader, moreInfo }) => (
  <Grid item xs={12} sm={12} md={12} lg={12}>
    <Grid container spacing={24} justify="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" gutterBottom>{header}</Typography>
        {subHeader && (<Typography paragraph>{subHeader}</Typography>)}
      </Grid>
      {moreInfo && (<Grid item className={classes.moreInfoContainer}>
        <MoreInfo/>
      </Grid>)}
    </Grid>
  </Grid>
)

PageHeading.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  moreInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
}

export default withStyles(styles)(PageHeading)
