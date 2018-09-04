import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper
} from '@material-ui/core'
import { DietaryTypes } from './dietary-restrictions'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3
  },
  formControl: {
    maxWidth: 300,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  }
})

export class Authorization extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  constructor() {
    super()

    // NOTE: This, or something similar to help identify a user, would usually
    // come from an authentication service
    window.localStorage.setItem('titus-user', 'MrsAdmin')
  }

  state = {
    userId: localStorage.getItem('titus-user') || 'MrsAdmin'
  }

  changeUser = ({ target: { value: userId } }) =>
    this.setState({ userId }, () => localStorage.setItem('titus-user', userId))

  render() {
    const { userId } = this.state
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Typography variant="headline" gutterBottom>
          Authorization Demo
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-user">Switch User</InputLabel>
          <Select
            value={userId}
            onChange={this.changeUser}
            inputProps={{ id: 'select-user' }}
          >
            <MenuItem value="MrsAdmin">Mrs Admin</MenuItem>
            <MenuItem value="MissEditor">Miss Editor</MenuItem>
            <MenuItem value="MrUser">Mr User</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Typography variant="headline" gutterBottom>
            Dietary Types
          </Typography>
        </div>
        <DietaryTypes userId={userId} />
      </Paper>
    )
  }
}

export default withStyles(styles)(Authorization)
