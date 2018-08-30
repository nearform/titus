import React from 'react'
import PropTypes from 'prop-types'
import { Mutation, Query } from 'react-apollo'
import {
  TableCell,
  TextField,
  Select,
  Button,
  MenuItem
} from '@material-ui/core'
import { Clear as ResetIcon, Check as SaveIcon } from '@material-ui/icons'
import { updateFood, loadFoodData } from './gql-queries'

class TableRowEdit extends React.Component {
  static propTypes = {
    onDone: PropTypes.func,
    rowKey: PropTypes.string,
    row: PropTypes.object
  }

  state = {
    pendingChanges: this.props.row,
    errors: {}
  }

  handleEdit = e => {
    const errors = !e.target.value ? { name: 'Name must not be empty' } : {}
    return this.setState({
      pendingChanges: {
        ...this.state.pendingChanges,
        name: e.target.value
      },
      errors
    })
  }

  handleSelectEdit = foodGroups => e => {
    const foodGroupId = e.target.value
    const { name: foodGroup } = foodGroups.find(({ id }) => foodGroupId === id)

    this.setState(state => ({
      pendingChanges: {
        ...state.pendingChanges,
        foodGroupId,
        foodGroup
      }
    }))
  }

  handleSubmit = updateFood => e => {
    const { onDone } = this.props
    const food = this.state.pendingChanges

    return new Promise(resolve => resolve(onDone())).then(
      updateFood({
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
    )
  }

  render () {
    const { rowKey } = this.props

    return (
      <Query query={loadFoodData}>
        {({ data: { foodGroups = [] } }) => (
          <Mutation mutation={updateFood} key={rowKey}>
            {updateFood => (
              <React.Fragment>
                <TableCell
                  aria-label='Food Name'
                  padding='checkbox'
                  key={`${rowKey}-name`}
                >
                  <TextField
                    fullWidth
                    required
                    label={!this.state.pendingChanges.name ? 'Food Name' : ''}
                    value={this.state.pendingChanges.name}
                    onChange={this.handleEdit}
                    error={!!this.state.errors.name}
                  />
                </TableCell>
                <TableCell
                  aria-label='Food Group'
                  padding='checkbox'
                  key={`${rowKey}-foodGroup`}
                >
                  <Select
                    autoWidth
                    value={this.state.pendingChanges.foodGroupId}
                    onChange={this.handleSelectEdit(foodGroups)}
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

                <TableCell padding='checkbox'>
                  <Button aria-label='Cancel' onClick={this.props.onDone}>
                    <ResetIcon />
                  </Button>
                </TableCell>
                <TableCell padding='checkbox'>
                  <Button
                    disabled={Boolean(this.state.errors.name)}
                    aria-label='Save'
                    onClick={this.handleSubmit(updateFood)}
                  >
                    <SaveIcon />
                  </Button>
                </TableCell>
              </React.Fragment>
            )}
          </Mutation>
        )}
      </Query>
    )
  }
}

export default TableRowEdit
