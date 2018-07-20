import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Table from './table/table'
import { loadFood, deleteFood, updateFood, createFood, loadFoodGroups } from '../../store/api/api-actions'

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
    filterable: true,
    width: '50%'
  },
  {
    accessor: 'foodGroup',
    label: 'Food Group',
    sortable: true,
    filterable: true,
    width: '40%'
  },
  {
    accessor: 'foodGroupId',
    hidden: true
  },
  {
    accessor: 'button1',
    width: '5%'
  },
  {
    accessor: 'button2',
    width: '5%'
  }
]

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressWrapper: {
    margin: 'auto 50%',
    paddingBottom: theme.spacing.unit * 3
  },
  citation: {
    '& span:first-of-type': {
      marginTop: theme.spacing.unit * 3
    }
  }
})

class Api extends React.Component {
  componentDidMount () {
    this.props.loadFood()
    if (!this.props.foodGroups) {
      this.props.loadFoodGroups()
    }
  }

  static propTypes = {
    loadingFood: PropTypes.bool.isRequired,
    loadingFoodGroups: PropTypes.bool.isRequired,
    error: PropTypes.any,
    food: PropTypes.array,
    createFood: PropTypes.func.isRequired,
    loadFood: PropTypes.func.isRequired,
    updateFood: PropTypes.func.isRequired,
    deleteFood: PropTypes.func.isRequired,
    foodGroups: PropTypes.array,
    loadFoodGroups: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  }

  deleteAllSelected = (rows) => {
    const ids = rows.map(row => row.rowData.find(r => r.accessor === 'id').data)
    this.props.deleteFood(ids)
  }

  render () {
    const { error, loadingFood, loadingFoodGroups, food, foodGroups, classes } = this.props

    if (error) {
      return <Typography color='error' >{error}</Typography>
    }

    if (loadingFood || loadingFoodGroups || !food || !foodGroups) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
      )
    }

    return <Fragment>
      <Table
        title='API CRUD Example'
        columns={columns}
        food={food}
        foodGroups={foodGroups}
        onCreate={this.props.createFood}
        onUpdate={this.props.updateFood}
        onDelete={this.deleteAllSelected}
      />
      <div className={classes.citation}>
        <Typography variant='caption'>Nutritional information provided by:</Typography>
        <Typography variant='caption'>US Department of Agriculture, Agricultural Research Service, Nutrient Data Laboratory. USDA National Nutrient Database for Standard Reference, Release 28. Version Current: September 2015. Internet: <a href='http://www.ars.usda.gov/ba/bhnrc/ndl'>http://www.ars.usda.gov/ba/bhnrc/ndl</a></Typography>
      </div>
    </Fragment>
  }
}

const mapStateToProps = ({ api: { food, loadingFood, foodGroups, loadingFoodGroups, error } }) => ({
  food,
  loadingFood,
  foodGroups,
  loadingFoodGroups,
  error
})

const mapDispatchToProps = {
  createFood,
  loadFood,
  updateFood,
  deleteFood,
  loadFoodGroups
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Api))
