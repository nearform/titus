import React from 'react'
import PropTypes from 'prop-types'
import { Table as NfTable } from '@nearform/react-table'
import MaterialUiTable from './material/material-ui-table'

class Table extends React.Component {
  static propTypes = {
    /** The callback function invoked when deleting items from the table. */
    onDelete: PropTypes.func,
    /** The title of the table. */
    title: PropTypes.string,
    /** The rows of data to display in the table. */
    rows: PropTypes.array,
    /** The definition of the table columns. */
    columns: PropTypes.array,
    /** The max number of rows to display in a table page. */
    pageSize: PropTypes.number,
    /** The possible values of page size to choose between. */
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
  }

  static defaultProps = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50]
  }

  renderMaterialUiTable = props => (
    <MaterialUiTable
      {...props}
      title={this.props.title}
      onDelete={this.props.onDelete}
    />
  )

  render() {
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
