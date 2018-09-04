import * as Yup from 'yup'
import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
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
  FormControl,
  FormGroup
} from '@material-ui/core'
import { Mutation, Query } from 'react-apollo'
import { loadFoodData, createFood } from '-!graphql-tag/loader!./queries.gql' // eslint-disable-line import/no-webpack-loader-syntax

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

const NewFoodForm = ({ classes, onClose }) => (
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
          <Formik
            initialValues={{
              name: '',
              foodGroupId: ''
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              const id = new Date().getTime()
              const food = values

              food.foodGroup = foodGroups.find(
                ({ id }) => id === food.foodGroupId
              ).name

              createFood({
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

              return onClose()
            }}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
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
          />
        )}
      </Mutation>
    )}
  </Query>
)

NewFoodForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewFoodForm)
