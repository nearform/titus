import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/Edit'
import ResetIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Check'
import MuiTableRow from '@material-ui/core/TableRow'

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
    // Copy normalised data to component state, where it will be edited from
    this.setState({ pendingChanges: row, isEditing: true })
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

  cancelEdit = () => {
    this.setState({
      pendingChanges: {},
      isEditing: false
    })
  }

  saveChanges = data => () => {
    this.props.handleUpdate(data)
  }

  render () {
    const { selected, rowKey, handleRowSelect, row, foodGroups } = this.props
    const { isEditing, pendingChanges } = this.state
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
          <TableCell aria-label='Food Name' padding='checkbox' key={`${rowKey}-name`}>
            { isEditing
              ? <TextField
                fullWidth
                value={this.state.pendingChanges.name}
                onChange={this.handleEdit('name')}
              />
              : row.name
            }
          </TableCell>
          <TableCell aria-label='Food Group' padding='checkbox' key={`${rowKey}-foodGroup`}>
            {isEditing
              ? <Select
                autoWidth
                value={this.state.pendingChanges.foodGroupId}
                onChange={this.handleEdit('foodGroupId')}
              >
                {foodGroups.map(o => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
              : row.foodGroup
            }
          </TableCell>
          { isEditing
            ? <Fragment>
              <TableCell padding='checkbox'>
                <Button aria-label='Cancel' onClick={this.cancelEdit}>
                  <ResetIcon />
                </Button>
              </TableCell>
              <TableCell padding='checkbox'>
                <Button aria-label='Save' onClick={this.saveChanges(pendingChanges)}>
                  <SaveIcon />
                </Button>
              </TableCell>
            </Fragment>
            : <Fragment>
              <TableCell padding='checkbox'>
                <Button aria-label='Edit' onClick={this.onEditClick(row)}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell />
            </Fragment>
          }
        </MuiTableRow>
      </Fragment>
    )
  }
}

export default TableRow
