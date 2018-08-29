import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import {
  TableCell,
  TextField,
  Select,
  Button,
  MenuItem,
  Checkbox,
  TableRow as MuiTableRow
} from '@material-ui/core'
import {
  Edit as EditIcon,
  Clear as ResetIcon,
  Check as SaveIcon
} from '@material-ui/icons'

class TableRow extends Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    handleRowSelect: PropTypes.func,
    selected: PropTypes.bool,
    rowKey: PropTypes.string,
    row: PropTypes.object,
    foodGroups: PropTypes.array
  }

  state = {
    isEditing: false,
    pendingChanges: {}
  }

  onEditClick = row => () => {
    this.setState({
      pendingChanges: row,
      isEditing: true
    })
  }

  handleEdit = accessor => e => {
    // Keep all changes in component state until saved or reverted
    this.setState({
      pendingChanges: {
        ...this.state.pendingChanges,
        [accessor]: e.target.value
      }
    })
  }

  handleSelectEdit = e => {
    const foodGroupId = e.target.value
    const { name: foodGroup } = this.props.foodGroups.find(
      ({ id }) => foodGroupId === id
    )

    this.setState(state => ({
      pendingChanges: {
        ...state.pendingChanges,
        foodGroupId,
        foodGroup
      }
    }))
  }

  resetEdit = cb => {
    this.setState(
      {
        pendingChanges: {},
        isEditing: false
      },
      () => (typeof cb === 'function' ? cb() : null)
    )
  }

  saveChanges = e => {
    const { pendingChanges } = this.state

    this.resetEdit(() => this.props.handleUpdate(pendingChanges))
  }

  render () {
    const { selected, rowKey, handleRowSelect, row, foodGroups } = this.props
    const { isEditing } = this.state

    return (
      <Fragment>
        <MuiTableRow
          hover
          role='checkbox'
          aria-checked={selected}
          tabIndex={-1}
          key={rowKey}
          selected={selected}
        >
          <TableCell padding='checkbox' key={`${rowKey}-checkbox`}>
            <Checkbox
              color='primary'
              value={rowKey}
              checked={selected}
              onClick={handleRowSelect}
            />
          </TableCell>
          <TableCell
            aria-label='Food Name'
            padding='checkbox'
            key={`${rowKey}-name`}
          >
            {isEditing ? (
              <TextField
                fullWidth
                value={this.state.pendingChanges.name}
                onChange={this.handleEdit('name')}
              />
            ) : (
              row.name
            )}
          </TableCell>
          <TableCell
            aria-label='Food Group'
            padding='checkbox'
            key={`${rowKey}-foodGroup`}
          >
            {isEditing ? (
              <Select
                autoWidth
                value={this.state.pendingChanges.foodGroupId}
                onChange={this.handleSelectEdit}
              >
                {foodGroups.map(o => {
                  return (
                    <MenuItem key={o.id} value={o.id}>
                      {o.name}
                    </MenuItem>
                  )
                })}
              </Select>
            ) : (
              row.foodGroup
            )}
          </TableCell>
          {isEditing ? (
            <Fragment>
              <TableCell padding='checkbox'>
                <Button aria-label='Cancel' onClick={this.resetEdit}>
                  <ResetIcon />
                </Button>
              </TableCell>
              <TableCell padding='checkbox'>
                <Button aria-label='Save' onClick={this.saveChanges}>
                  <SaveIcon />
                </Button>
              </TableCell>
            </Fragment>
          ) : (
            <Fragment>
              <TableCell padding='checkbox'>
                <Button aria-label='Edit' onClick={this.onEditClick(row)}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell />
            </Fragment>
          )}
        </MuiTableRow>
      </Fragment>
    )
  }
}

export default TableRow
