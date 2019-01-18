import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { PageHeading } from '../utils'
import Area from './area'
import Bar from './bar'
import Candlestick from './candlestick'
import TreeGraph from './tree-graph'

const MORE_INFO = 'More info dialog content'
const SUB_HEADER = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.'

const Visualisations = () => (
  <Grid container spacing={24}>
    <PageHeading header="Visualisation" subHeader={SUB_HEADER} moreInfo={MORE_INFO}/>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper>
        <Area/>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper>
        <Bar/>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper>
        <Candlestick/>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Paper>
        <TreeGraph/>
      </Paper>
    </Grid>
  </Grid>
)

export default Visualisations
