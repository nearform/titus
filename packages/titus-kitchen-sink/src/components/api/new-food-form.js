import * as Yup from 'yup'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
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
  FormControl,
  FormGroup,
  withStyles
} from '@material-ui/core'
import { loadFoodData } from './lib/utils'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 2,
    flex: 1
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center'
  }
})

const schema = Yup.object().shape({
  name: Yup.string().required('Name must not be empty.'),
  foodGroupId: Yup.string().required('Food Group must be selected.')
})

class NewFoodForm extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    loadFoodData: PropTypes.object.isRequired,
    createFood: PropTypes.func.isRequired
  }

  handleSubmit = (values) => {
    const id = new Date().getTime()
    const food = values
    const { loadFoodData: { foodGroups = [] } } = this.props

    food.foodGroup = foodGroups.find(({ id }) => id === food.foodGroupId).name

    this.props.createFood({
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
      },
      update: (cache, { data: { createFood } }) => {
        const { updated } = createFood
        const data = cache.readQuery({ query: loadFoodData })

        data.allFood = [...data.allFood, updated]
        cache.writeQuery({ query: loadFoodData, data })
      }
    })

    return this.props.onClose()
  }

  render() {
    const { classes, onClose, loadFoodData: { foodGroups = [] } } = this.props

    return (
      <Formik
        initialValues={{
          name: '',
          foodGroupId: ''
        }}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Dialog
            fullWidth
            open
            onClose={onClose}
            aria-labelledby="form-dialog-title"
          >
            <Form noValidate>
              <DialogTitle id="form-dialog-title">
                Add New Food Item
              </DialogTitle>
              <div>
                <FormGroup row>
                  <FormControl
                    className={classes.formControl}
                    margin="dense"
                  >
                    <TextField
                      required
                      autoFocus
                      label="Name"
                      name="name"
                      value={values.name}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    required
                    className={classes.formControl}
                    margin="dense"
                  >
                    <InputLabel
                      error={Boolean(
                        touched.foodGroupId && errors.foodGroupId
                      )}
                      htmlFor="food-group-input"
                    >
                      Food Group
                    </InputLabel>
                    <Select
                      margin="dense"
                      autoWidth
                      displayEmpty
                      label="Food Group"
                      name="foodGroupId"
                      inputProps={{
                        id: 'food-group-input'
                      }}
                      value={values.foodGroupId}
                      error={Boolean(
                        touched.foodGroupId && errors.foodGroupId
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {foodGroups.map(o => (
                        <MenuItem key={o.id} value={o.id}>
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={Boolean(
                        touched.foodGroupId && errors.foodGroupId
                      )}
                    >
                      {touched.foodGroupId && errors.foodGroupId}
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
              </div>
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Form>
          </Dialog>
        )}
      </Formik>
    )
  }
}

export default withStyles(styles)(NewFoodForm)
