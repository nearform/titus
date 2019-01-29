import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TableCell,
  Button,
  Checkbox,
  TableRow as MaterialTableRow
} from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import { TableRowEdit } from './'

class TableRow extends Component {
  static propTypes = {
    handleRowSelect: PropTypes.func,
    selected: PropTypes.bool,
    rowKey: PropTypes.string,
    row: PropTypes.object
  }

  state = {
    isEditing: false
  }

  onEditClick = () => this.setState({ isEditing: true })

  onDone = () => this.setState({ isEditing: false })

  render() {
    const { selected, rowKey, handleRowSelect, row } = this.props
    const { isEditing } = this.state

    return (
      <MaterialTableRow
        hover
        role="checkbox"
        aria-checked={selected}
        tabIndex={-1}
        key={rowKey}
        selected={selected}
      >
        <TableCell padding="checkbox" key={`${rowKey}-checkbox`}>
          <Checkbox
            color="primary"
            value={rowKey}
            checked={selected}
            onClick={handleRowSelect}
            disabled={isEditing}
          />
        </TableCell>

        {isEditing ? (
          <TableRowEdit row={row} onDone={this.onDone} />
        ) : (
          <React.Fragment>
            <TableCell
              aria-label="Food Name"
              padding="checkbox"
              key={`${rowKey}-name`}
            >
              {row.name}
            </TableCell>
            <TableCell
              aria-label="Food Group"
              padding="checkbox"
              key={`${rowKey}-foodGroup`}
            >
              {row.foodGroup}
            </TableCell>

            <TableCell padding="checkbox">
              <Button
                disabled={selected}
                aria-label="Edit"
                onClick={this.onEditClick}
              >
                <EditIcon />
              </Button>
            </TableCell>
            <TableCell />
          </React.Fragment>
        )}
      </MaterialTableRow>
    )
  }
}

export default TableRow
