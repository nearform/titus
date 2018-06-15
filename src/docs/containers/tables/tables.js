import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { Table } from './nf-table'
import { customTableProp } from './render-props/custom/custom'
import MaterialUiTableProp from './render-props/material/material'
import { columns, rows } from './mock/dessert-nutrients'

class TitusTables extends React.Component {
  state = {
    material: false
  };

  handleChange = event => {
    this.setState({ material: event.target.checked })
  };

  render () {
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
            data={rows}
            render={config => <MaterialUiTableProp data={config} />}
          />
        </div>

        <div style={this.state.material ? { display: 'none' } : null}>
          <Table
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 20, 50]}
            data={rows}
            render={obj => customTableProp(obj)}
          />
        </div>
      </div>
    )
  }
}

export default TitusTables
