import React from 'react'
import { Table } from 'titus-components'
import { columns, rows } from './mock/dessert-nutrients'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  hide: {
    display: 'none'
  }
})

class Tables extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  }
  state = {
    materialUi: true,
    columns: columns,
    rows: rows
  }

  handleChange = event => {
    this.setState({ materialUi: !this.state.materialUi })
  }

  handleDelete = selected => {
    alert(selected)
  }

  render () {
    const { columns, rows, materialUi } = this.state
    const { classes } = this.props
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={materialUi}
              onChange={e => this.handleChange(e)}
              value='Show Material Version'
              color='primary'
            />
          }
          label={'Material: ' + materialUi}
        />

        <div className={classNames({ [classes.hide]: !materialUi })}>
          <Table columns={columns} rows={rows} onDelete={this.handleDelete} />
        </div>

        <div className={classNames({ [classes.hide]: materialUi })}>
          <Table
            columns={columns}
            rows={rows}
            ui='custom'
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Tables)
