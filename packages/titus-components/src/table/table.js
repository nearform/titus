import React from 'react'
import PropTypes from 'prop-types'
import { Table as NfTable } from 'react-nf-table'
import MaterialUiTable from './material/material-ui-table'

class Table extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    title: PropTypes.string,
    rows: PropTypes.array,
    columns: PropTypes.array,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.array
  }

  static defaultProps = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50]
  }

  // TODO: other events as necessary
  // e.g. request for more data on pagination, row edited etc.

  renderMaterialUiTable = props => (
    <MaterialUiTable
      {...props}
      title={this.props.title}
      onDelete={this.props.onDelete}
    />
  )

  render () {
    const { rows, columns, pageSize, pageSizeOptions } = this.props

    return (
      <NfTable
        columns={columns}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        data={rows}
        render={this.renderMaterialUiTable}
      />
    )
  }
}

export default Table
