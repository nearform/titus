import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Query } from 'react-apollo'
import { FormControl, Paper, Typography, withStyles } from '@material-ui/core'
import { Autocomplete, Table } from '@nearform/titus-components'
import { loadFoodHistoryData } from './queries.graphql'
import { loadFoodData } from '../api/queries.graphql'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  paperPadding: {
    padding: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column'
  },
  verticalMargin: {
    marginBottom: theme.spacing.unit * 3
  },
  citation: {
    '& span:first-of-type': {
      marginTop: theme.spacing.unit * 3
    }
  }
})

const columns = [
  {
    accessor: 'name',
    label: 'Name',
  },
  {
    accessor: 'foodGroup',
    label: 'Food Group',
  },
  {
    accessor: 'validSince',
    label: 'Valid Since',
  },
  {
    accessor: 'validUntil',
    label: 'Valid Until',
  }
]


class Temporal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
  }

  static defaultProps = {
    title: 'Food record history',
    columns
  }

  state = {
    selectedFoodId: ''
  }

  selectFood = ({key}) => this.setState({selectedFoodId: key})

  render() {
    const { classes, title, columns } = this.props
    const { selectedFoodId } = this.state

    return (
      <div  className={classes.root}>
        <Typography variant="headline" gutterBottom>
          Temporal Tables Demo
        </Typography>
        <Typography variant="subheading" gutterBottom>
          This demo shows the <a href="https://github.com/nearform/temporal_tables" target="_blank" rel="noopener noreferrer">temporal tables extension</a> in action. 
          It track changes to table records.
        </Typography>
        <Paper className={classNames(classes.paperPadding, classes.verticalMargin)}>
          <Query query={loadFoodData}>
          {({ loading, error, data: { allFood = [] } }) => {
            if (error) {
              return (
                <Typography color="error">
                  Oops, there was an error requesting the list of foods!
                </Typography>
              )
            }

            const allFoodAutocomplete = allFood.map(({id, name}) => ({key: id, value: name}))
            
            return (
              <React.Fragment>
                <Paper className={classNames(classes.paperPadding, classes.verticalMargin)}>
                  <FormControl>
                    <Autocomplete
                      placeholder="Find a food by typing its name"
                      id="food-autocomplete"
                      data={allFoodAutocomplete}
                      onChange={this.selectFood}
                      maxResults={10}
                      filterType="contains"
                      loading={loading}
                    />
                  </FormControl>
                </Paper>
                <Query 
                  query={loadFoodHistoryData} 
                  variables={{id: selectedFoodId}} 
                  skip={!selectedFoodId} 
                  fetchPolicy="cache-and-network"
                >
                {({ error, data: { foodHistory = [] } }) => {
                  if (error) {
                    return (
                      <Typography color="error">
                        Oops, there was an error requesting the history of food!
                      </Typography>
                    )
                  }

                  if (!selectedFoodId) {
                    return null
                  }

                  if (!foodHistory.length) {
                    return (
                      <Typography>
                        The selected food doesn't have any history, try selecting a different food or make some changes to it
                      </Typography>
                    )
                  }

                  const history = foodHistory.map(food => ({
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
                }}
                </Query> 
              </React.Fragment> 
            )
          }}
          </Query>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Temporal)
