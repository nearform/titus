import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { Table } from '@nearform/titus-components'
import { loadFood, deleteFood } from '../../store/api/api-actions'

const columns = [
  {
    accessor: 'id',
    label: 'id',
    sortable: false,
    filterable: false,
    hidden: true
  },
  {
    accessor: 'name',
    label: 'Name',
    sortable: true,
    filterable: true
  },
  {
    accessor: 'foodGroup',
    label: 'Food Group',
    sortable: true,
    filterable: true
  }
]

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressWrapper: {
    margin: 'auto 50%',
    paddingBottom: theme.spacing.unit * 3
  }
})

class Api extends React.Component {
  componentDidMount () {
    this.props.loadFood()
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    food: PropTypes.array,
    loadFood: PropTypes.func.isRequired,
    deleteFood: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  }

  onDelete = (rows) => {
    const ids = rows.map(row => row.rowData.find(r => r.accessor === 'id').data)
    this.props.deleteFood(ids)
  }

  render () {
    const { error, loading, food, classes } = this.props

    if (error) {
      return <Typography color='error' >{error}</Typography>
    }

    if (loading || !food) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
      )
    }

    return <Table
      title='API CRUD Example'
      columns={columns}
      rows={food}
      onDelete={this.onDelete}
    />
  }
}

const mapStateToProps = ({ api: { food, loading, error } }) => ({
  food,
  loading,
  error
})

const mapDispatchToProps = {
  loadFood,
  deleteFood
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Api))
