import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl
} from '@material-ui/core'
import { Mutation, Query } from 'react-apollo'
import { createFood, loadFoodData } from '../../queries'

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
    onClose: PropTypes.func.isRequired,
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

  onSubmit = ({ createFood, foodGroups }) => () => {
    const errors = {
      name: this.validations.name(this.state.newRow.name),
      foodGroupId: this.validations.foodGroupId(this.state.newRow.foodGroupId)
    }

    if (Object.values(errors).filter(i => i).length) {
      return this.setState({ errors })
    }

    const { newRow: food } = this.state

    this.setState(
      {
        newRow: {
          name: '',
          foodGroupId: '__'
        },
        errors: []
      },
      () => this.props.onClose()
    )

    food.foodGroup = foodGroups.find(({ id }) => id === food.foodGroupId).name

    const id = new Date().getTime()

    return createFood({
      variables: { food },
      optimisticResponse: {
        __typename: 'Mutation',
        createFood: {
          __typename: 'UpdateFoodResult',
          id,
          typeName: 'Food',
          count: 1,
          operation: 'create',
          updated: {
            __typename: 'Food',
            id,
            name: food.name,
            foodGroup: {
              __typename: 'FoodGroup',
              id: food.foodGroupId,
              name: food.foodGroup
            }
          }
        }
      }
    })
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
      this.props.onClose
    )
  }

  render () {
    const { classes, visible } = this.props
    return (
      <Query query={loadFoodData}>
        {({ data: { foodGroups = [] } }) => (
          <Mutation
            mutation={createFood}
            update={(cache, { data: { createFood } }) => {
              const { updated } = createFood
              const data = cache.readQuery({ query: loadFoodData })

              data.allFood = [...data.allFood, updated]
              cache.writeQuery({ query: loadFoodData, data })
            }}
          >
            {createFood => (
              <Dialog
                fullWidth
                open={visible}
                onClose={this.handleClose}
                aria-labelledby='form-dialog-title'
              >
                <DialogTitle id='form-dialog-title'>
                  Add New Food Item
                </DialogTitle>
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
                      {foodGroups.map(o => (
                        <MenuItem key={o.id} value={o.id}>
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={!!this.state.errors.foodGroupId}>
                      {this.state.errors.foodGroupId}
                    </FormHelperText>
                  </FormControl>
                </div>
                <DialogActions>
                  <Button
                    variant='outlined'
                    onClick={this.onCancel}
                    color='primary'
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    onClick={this.onSubmit({ createFood, foodGroups })}
                    color='primary'
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </Mutation>
        )}
      </Query>
    )
  }
}

export default withStyles(styles)(NewFoodForm)
