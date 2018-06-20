import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { Table } from 'react-nf-table'
import CustomTable from './ui/custom/custom-table'
import MaterialUiTable from './ui/material/material-ui-table'
import { columns, rows } from './mock/dessert-nutrients'

class Tables extends React.Component {
  state = {
    material: false,
    data: rows
  }

  handleChange = event => {
    this.setState({ material: event.target.checked })
  }

  handleDelete = selected => {
    // this would probably call back to db,
    // modify the state data object and re-render should occur
    alert(selected)
  }

  renderMaterialUiTable = obj => {
    return (<MaterialUiTable
      {...obj}
      onDelete={(selected) => this.handleDelete(selected)}
    />)
  }

  renderCustomTable = obj => {
    return (<CustomTable
      {...obj}
      onDelete={(selected) => this.handleDelete(selected)}
    />)
  }

  render () {
    const { data, material } = this.state
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={material}
              onChange={e => this.handleChange(e)}
              value='Show Material Version'
              color='primary'
            />
          }
          label={'Material: ' + material}
        />

        <div style={!material ? { display: 'none' } : null}>
          <Table
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 20, 50]}
            data={data}
            render={(obj) => this.renderMaterialUiTable(obj)}
          />
        </div>

        <div style={material ? { display: 'none' } : null}>
          <Table
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 20, 50]}
            data={data}
            render={(obj) => this.renderCustomTable(obj)}
          />
        </div>
      </div>
    )
  }
}

export default Tables
