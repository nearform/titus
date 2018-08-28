import React from 'react'
import PropTypes from 'prop-types'
import { Table as NfTable } from '@nearform/react-table'
import MaterialUiTable from './material/material-ui-table'
import { Query } from 'react-apollo'
import { loadFoodData } from '../../../queries'
import { CircularProgress, Typography, withStyles } from '@material-ui/core'

class Table extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.array
  }

  static defaultProps = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50]
  }

  render () {
    const { classes, title, columns, pageSize, pageSizeOptions } = this.props

    return (
      <Query query={loadFoodData}>
        {({ loading, error, data: { allFood = [], foodGroups = [] } }) => {
          if (loading) {
            return (
              <div className={classes.progressWrapper}>
                <CircularProgress className={classes.progress} />
              </div>
            )
          }
          if (error) {
            return <Typography color='error'>{error.message}</Typography>
          }

          const food = allFood.map(food => ({
            id: food.id,
            name: food.name,
            foodGroup: food.foodGroup.name,
            foodGroupId: food.foodGroup.id
          }))

          return (
            <NfTable
              columns={columns}
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              data={food}
              sorting={[{ id: 'name', asc: true }]}
              render={props => {
                return <MaterialUiTable {...props} title={title} />
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default withStyles(theme => ({
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
}))(Table)
