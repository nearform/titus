import React from 'react'
import PropTypes from 'prop-types'
import { Table as NfTable } from '@nearform/react-table'
import MaterialUiTable from './material/material-ui-table'

class Table extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    food: PropTypes.array.isRequired,
    foodGroups: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.array
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
      onUpdate={this.props.onUpdate}
      onCreate={this.props.onCreate}
      foodGroups={this.props.foodGroups}
    />
  )

  render () {
    const { food, columns, pageSize, pageSizeOptions } = this.props

    return (
      <NfTable
        columns={columns}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        data={food}
        render={this.renderMaterialUiTable}
        sorting={[{id: 'name', asc: true}]}
      />
    )
  }
}

export default Table
