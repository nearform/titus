import React from 'react'
import { Grid, Link, Typography } from '@material-ui/core'

const Dashboard = () => (
  <Grid
    container
    alignContent="center"
    alignItems="center"
    direction="column"
    justify="center"
  >
    <img alt="Titus logo" style={{ height: '50vh' }} src="img/logo-pos.svg" />
    <Typography
      align="center"
      variant="body1"
      paragraph
      style={{ maxWidth: '670px' }}
    >
      Develop and Deploy to features in week one using Titus, an Accelerated
      Development & Deployment Stack. Titus is production ready can be deployed
      to all major cloud providers.
    </Typography>
    <Link
      href="https://nearform.github.io/titus"
      rel="noopener"
      target="_blank"
    >
      Check out the docs
    </Link>
  </Grid>
)

export default Dashboard
