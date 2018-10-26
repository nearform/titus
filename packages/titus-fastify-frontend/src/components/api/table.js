import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { CircularProgress, Typography, withStyles } from '@material-ui/core'
import { Table as NfTable } from '@nearform/react-table'
import MaterialUiTable from './material-ui-table'
import { loader } from 'graphql.macro'

const loadFoodData = loader('./queries/loadFoodData.graphql')

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

class Table extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.array
  }

  static defaultProps = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    title: 'API CRUD Example',
    columns
  }

  render() {
    const {
      classes,
      title,
      columns,
      pageSize,
      pageSizeOptions,
      data: { loading, error, allFood }
    } = this.props

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
      )
    }

    if (error) {
      return (
        <Typography color="error">
          Oops, there was an error making this request!
        </Typography>
      )
    }

    const food = allFood.map(food => ({
      id: food.id,
      name: food.name,
      foodGroup: food.foodGroup.name,
      foodGroupId: food.foodGroup.id
    }))

    return (
      <React.Fragment>
        <NfTable
          columns={columns}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          data={food}
          sorting={[{ id: 'name', asc: true }]}
          render={props => <MaterialUiTable {...props} title={title} />}
        />

        <div className={classes.citation}>
          <Typography variant="caption">
            Nutritional information provided by:
          </Typography>
          <Typography variant="caption">
            US Department of Agriculture, Agricultural Research Service,
            Nutrient Data Laboratory. USDA National Nutrient Database for
            Standard Reference, Release 28. Version Current: September 2015.
            Internet:{' '}
            <a href="http://www.ars.usda.gov/ba/bhnrc/ndl">
              http://www.ars.usda.gov/ba/bhnrc/ndl
            </a>
          </Typography>
        </div>
      </React.Fragment>
    )
  }
}

export default graphql(loadFoodData)(withStyles(styles)(Table))
