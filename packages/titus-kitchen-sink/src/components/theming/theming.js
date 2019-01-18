import React from 'react'
import {withStyles, Paper, Typography, Grid} from '@material-ui/core'

const styles = ({nearform = {}, spacing}) =>
  Object.assign({
      paper: {
        padding: spacing.unit * 2,
        marginBottom: spacing.unit,
      },
    },
    Object
      .keys(nearform)
      .map(key => ({[key]: {color: nearform[key], borderColor: nearform[key]}}))
      .reduce((acc, c) => Object.assign(acc, c), {}),
  )

const Theming = ({classes}) => (
  <Grid container spacing={24}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Typography variant="h3" gutterBottom>Theming</Typography>
      <Typography paragraph>
        This is a dashboard showing the theme we use at NearForm. Use the theme switcher button above to switch theme.
      </Typography>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Typography variant="title" className={classes.blue} paragraph>
        This text will appear <code>NearForm blue</code> when using the NearForm theme
      </Typography>
      <Typography variant="title" className={classes.midnightBlue} paragraph>
        This text will appear <code>midnight blue</code> when using the NearForm theme
      </Typography>
      <Typography variant="title" className={classes.supersplit} paragraph>
        This text will appear <code>supersplit</code> when using the NearForm theme
      </Typography>
      <Typography variant="title" className={classes.brunchPink} paragraph>
        This text will appear <code>brunch pink</code> when using the NearForm theme
      </Typography>
      <Typography variant="title" className={classes.bubblegum} paragraph>
        This text will appear <code>bublegum</code> when using the NearForm theme
      </Typography>
      <Paper className={classes.paper} classes={{root: classes.sand4}}>
        This text will appear <code>sand 4</code> when using the NearForm theme
      </Paper>
      <Paper className={classes.paper} classes={{root: classes.sand3}}>
        This text will appear <code>sand 3</code> when using the NearForm theme
      </Paper>
      <Paper className={classes.paper} classes={{root: classes.sand2}}>
        This text will appear <code>sand 2</code> when using the NearForm theme
      </Paper>
      <Paper className={classes.paper} classes={{root: classes.sand1}}>
        This text will appear <code>sand 1</code> when using the NearForm theme
      </Paper>
    </Grid>
  </Grid>
)

export default withStyles(styles, {withTheme: true})(Theming)
