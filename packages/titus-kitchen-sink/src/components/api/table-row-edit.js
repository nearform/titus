import * as Yup from 'yup'
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Mutation, Query } from 'react-apollo'
import {
  TableCell,
  TextField,
  Select,
  Button,
  MenuItem
} from '@material-ui/core'
import { Clear as ResetIcon, Check as SaveIcon } from '@material-ui/icons'
import { loadFoodData, updateFood } from './lib/utils'

const schema = Yup.object().shape({
  name: Yup.string().required('Name must not be empty.'),
  foodGroupId: Yup.string().required('Food Group must be selected.')
})

const TableRowEdit = ({ rowKey, row, onDone }) => (
  <Query query={loadFoodData}>
    {({ data: { foodGroups = [] } }) => (
      <Mutation mutation={updateFood} key={rowKey}>
        {updateFood => (
          <Formik
            initialValues={{ name: row.name, foodGroupId: row.foodGroupId }}
            isInitialValid={() => Boolean(row.name && row.foodGroupId)}
            validationSchema={schema}
            onSubmit={(values) => {
              const food = values
              if (
                food.name === row.name &&
                food.foodGroupId === row.foodGroupId
              ) {
                return onDone()
              }

              food.foodGroup = foodGroups.find(
                ({ id }) => id === food.foodGroupId
              ).name

              food.id = row.id

              return updateFood({
                variables: { food },
                optimisticResponse: {
                  __typename: 'Mutation',
                  updateFood: {
                    __typename: 'UpdateFoodResult',
                    id: food.id,
                    typeName: 'Food',
                    count: 1,
                    operation: 'update',
                    updated: {
                      __typename: 'Food',
                      id: food.id,
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
            }}
            render={({
              values,
              errors,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
              <>
                <TableCell
                  aria-label="Food Name"
                  padding="checkbox"
                  key={`${rowKey}-name`}
                >
                  <TextField
                    fullWidth
                    required
                    label={!values.name ? 'Name' : ''}
                    name="name"
                    value={values.name}
                    error={Boolean(errors.name)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </TableCell>
                <TableCell
                  aria-label="Food Group"
                  padding="checkbox"
                  key={`${rowKey}-foodGroup`}
                >
                  <Select
                    autoWidth
                    name="foodGroupId"
                    value={values.foodGroupId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {foodGroups.map(o => {
                      return (
                        <MenuItem key={o.id} value={o.id}>
                          {o.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </TableCell>

                <TableCell padding="checkbox">
                  <Button aria-label="Cancel" onClick={onDone}>
                    <ResetIcon />
                  </Button>
                </TableCell>
                <TableCell padding="checkbox">
                  <Button
                    disabled={!isValid}
                    aria-label="Save"
                    onClick={handleSubmit}
                  >
                    <SaveIcon />
                  </Button>
                </TableCell>
              </>
            )}
          />
        )}
      </Mutation>
    )}
  </Query>
)

TableRowEdit.propTypes = {
  onDone: PropTypes.func,
  rowKey: PropTypes.string,
  row: PropTypes.object
}

export default TableRowEdit
