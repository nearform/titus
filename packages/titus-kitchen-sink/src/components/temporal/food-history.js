import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { Query } from 'react-apollo'
import { Table } from '@nearform/titus-components'

import { loadFoodHistoryData } from './queries.graphql'

const styles = (theme) => ({
  citation: {
    '& span:first-of-type': {
      marginTop: theme.spacing.unit * 3
    }
  }
})

export default class FoodHistory extends React.PureComponent {
  static propTypes = {
    selectedFoodId: PropTypes.string,
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired
  }

  render () {
    const { selectedFoodId, title, columns } = this.props

    return (
      <Query
        query={loadFoodHistoryData}
        variables={{ id: selectedFoodId }}
        skip={!selectedFoodId}
        fetchPolicy="cache-and-network"
      >
        {(props) => (
          <QueryResult
            title={title}
            columns={columns}
            {...props}
          />
        )}
      </Query>
    )
  }
}

class QueryResult extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    data: PropTypes.object,
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
  }

  static defaultProps = {
    data: {}
  }

  render () {
    if (this.props.error) {
      return (
        <Typography color="error">
          Oops, there was an error requesting the history of food!
        </Typography>
      )
    }

    const { title, columns, classes, data: { foodHistory = [] } } = this.props

    if (!foodHistory.length) {
      return (
        <Typography>
          The selected food doesn't have any history, try selecting a different food or make some changes to it
        </Typography>
      )
    }

    const history = foodHistory.map((food) => ({
      id: food.id,
      name: food.name,
      foodGroup: food.foodGroup.name,
      validSince: new Date(food.sysPeriod.begin).toLocaleString(),
      validUntil: new Date(food.sysPeriod.end).toLocaleString(),
    }))

    return (
      <React.Fragment>
        <Table
          title={title}
          columns={columns}
          rows={history}
        />
        <div className={classes.citation}>
          <Typography variant="caption">
            Nutritional information provided by:
          </Typography>
          <Typography variant="caption">
            US Department of Agriculture, Agricultural Research Service,
            Nutrient Data Laboratory. USDA National Nutrient Database for
            Standard Reference, Release 28. Version Current: September
            2015. Internet:{' '}
            <a href="http://www.ars.usda.gov/ba/bhnrc/ndl">
              http://www.ars.usda.gov/ba/bhnrc/ndl
            </a>
          </Typography>
        </div>
      </React.Fragment>
    )
  }
}

QueryResult = withStyles(styles)(QueryResult)
