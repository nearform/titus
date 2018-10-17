import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Query } from 'react-apollo'
import { FormControl, Paper, Typography, withStyles } from '@material-ui/core'
import { Autocomplete } from '@nearform/titus-components'
import { loader } from 'graphql.macro'

import FoodHistory from './food-history'

const loadFoodData = loader('../api/queries/loadFoodData.graphql')

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
          {({ loading, error, data: { allFood = [] } = {} }) => {
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
                {selectedFoodId && (
                  <FoodHistory
                    title={title}
                    columns={columns}
                    selectedFoodId={selectedFoodId}
                  />
                )}
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
