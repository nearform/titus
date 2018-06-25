import React from 'react'
import PropTypes from 'prop-types'
import { Table as NfTable } from 'react-nf-table'
import CustomTable from './ui/custom/custom-table'
import MaterialUiTable from './ui/material/material-ui-table'

class Table extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    title: PropTypes.string,
    rows: PropTypes.array,
    columns: PropTypes.array,
    ui: PropTypes.oneOf(['material', 'custom']),
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.array
  }

  static defaultProps = {
    ui: 'material',
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50]
  }

  // TODO: other events as necessary
  // e.g. request for more data on pagination, row edited etc.

  handleDelete = selected => {
    if (this.props.onDelete) {
      this.props.onDelete(selected)
    }
  }

  renderMaterialUiTable = props => (
    <MaterialUiTable
      {...props}
      title={this.props.title}
      onDelete={this.handleDelete}
    />
  )

  renderCustomTable = props => (
    <CustomTable
      {...props}
      title={this.props.title}
      onDelete={this.handleDelete}
    />
  )

  render () {
    const { rows, columns, ui, pageSize, pageSizeOptions } = this.props

    // runtime conditional statement would not work on render prop itself, so rendering
    // different table if this prop changes
    return (
      <NfTable
        columns={columns}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        data={rows}
        render={
          ui === 'material'
            ? this.renderMaterialUiTable
            : this.renderCustomTable
        }
      />
    )
  }
}

export default Table
