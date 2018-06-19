import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { Table } from 'react-nf-table'
import CustomTableProp from './render-props/custom/custom'
import MaterialUiTableProp from './render-props/material/material'
import { columns, rows } from './mock/dessert-nutrients'

class TitusTables extends React.Component {
  state = {
    material: false,
    data: rows
  };

  handleChange = event => {
    this.setState({ material: event.target.checked })
  };

  handleDelete = selected => {
    // this would probably call back to db,
    // modify the state data object and re-render should occur
    alert(selected)
  };

  render () {
    const { data } = this.state
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.material}
              onChange={e => this.handleChange(e)}
              value='Show Material Version'
              color='primary'
            />
          }
          label={'Material: ' + this.state.material}
        />

        <div style={!this.state.material ? { display: 'none' } : null}>
          <Table
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 20, 50]}
            data={data}
            render={obj => (
              <MaterialUiTableProp
                data={obj}
                onDelete={selected => this.handleDelete(selected)}
              />
            )}
          />
        </div>

        <div style={this.state.material ? { display: 'none' } : null}>
          <Table
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 20, 50]}
            data={data}
            render={obj => (
              <CustomTableProp
                data={obj}
                onDelete={selected => this.handleDelete(selected)}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default TitusTables
