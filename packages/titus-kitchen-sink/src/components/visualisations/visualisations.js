import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Area from './area'
import Bar from './bar'
import Candlestick from './candlestick'
import TreeGraph from './tree-graph'

const Visualisations = () => (
  <div>
    <Typography variant="h3" gutterBottom>
      Visualisation
    </Typography>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper>
          <Area />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper>
          <Bar />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper>
          <Candlestick />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Paper>
          <TreeGraph />
        </Paper>
      </Grid>
    </Grid>
  </div>
)

export default Visualisations
