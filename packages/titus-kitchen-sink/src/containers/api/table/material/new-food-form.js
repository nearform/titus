import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 2,
    flex: 1
  },
  formContainer: {
    display: 'flex'
  }
})

class NewFoodForm extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancelAdd: PropTypes.func.isRequired,
    foodGroups: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
  }

  state = {
    newRow: {
      name: '',
      foodGroupId: '__'
    },
    errors: []
  }

  validations = {
    name: value => (value.trim() === '' ? 'Name must not be empty' : null),
    foodGroupId: value =>
      value === '__' ? 'Food Group must be selected' : null
  }

  handleAddUpdate = accessor => e => {
    this.setState({
      newRow: {
        ...this.state.newRow,
        [accessor]: e.target.value
      },
      errors: {
        ...this.state.errors,
        [accessor]: this.validations[accessor](e.target.value)
      }
    })
  }

  onSubmit = () => {
    const errors = {
      name: this.validations.name(this.state.newRow.name),
      foodGroupId: this.validations.foodGroupId(this.state.newRow.foodGroupId)
    }

    if (Object.values(errors).filter(i => i).length) {
      return this.setState({ errors })
    }

    const { newRow } = this.state

    return this.setState(
      {
        newRow: {
          name: '',
          foodGroupId: '__'
        },
        errors: []
      },
      () => this.props.onSubmit(newRow)
    )
  }

  onCancel = () => {
    this.setState(
      {
        newRow: {
          name: '',
          foodGroupId: '__'
        },
        errors: []
      },
      this.props.onCancelAdd
    )
  }

  render () {
    const { classes, foodGroups, visible } = this.props
    return (
      <Dialog
        fullWidth
        open={visible}
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add New Food Item</DialogTitle>
        <div className={classes.formContainer}>
          <FormControl className={classes.formControl}>
            <TextField
              required
              autoFocus
              margin='dense'
              label='Name'
              value={visible ? this.state.newRow.name : ''}
              error={!!this.state.errors.name}
              helperText={this.state.errors.name}
              onChange={this.handleAddUpdate('name')}
            />
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel
              error={!!this.state.errors.foodGroupId}
              htmlFor='food-group-input'
            >
              Food Group
            </InputLabel>
            <Select
              autoWidth
              displayEmpty
              label='Food Group'
              inputProps={{
                id: 'food-group-input'
              }}
              value={this.state.newRow.foodGroupId}
              error={!!this.state.errors.foodGroupId}
              onChange={this.handleAddUpdate('foodGroupId')}
            >
              {[
                ...foodGroups.map(o => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))
              ]}
            </Select>
            <FormHelperText error={!!this.state.errors.foodGroupId}>
              {this.state.errors.foodGroupId}
            </FormHelperText>
          </FormControl>
        </div>
        <DialogActions>
          <Button variant='outlined' onClick={this.onCancel} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={this.onSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(NewFoodForm)
