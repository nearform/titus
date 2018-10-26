import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  FormControl,
  FormHelperText,
  Select,
  MenuItem
} from '@material-ui/core'
import { Autocomplete } from '@nearform/titus-components'
import { loader } from 'graphql.macro'

const recordSearch = loader('./queries/recordSearch.graphql')

const styles = theme => ({
  verticalMargin: {
    marginBottom: theme.spacing.unit * 3
  }
})

class RecordSearch extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  }

  state = {
    timerId: null,
    inputChanged: false,
    inputValue: '',
    searchType: 'startsWith'
  }

  handleFilterChange = event =>
    this.setState({ searchType: event.target.value })

  handleChange = item => {
    alert('You selected: ' + item.value + ' (' + item.key + ')')
  }

  handleInputChange = ({ value }) => {
    this.setState({ inputChanged: true })
    // cancel previous timer, we only want one request after the delay
    clearTimeout(this.state.timerId)

    this.setState({
      // give user a chance to type before we call
      timerId: setTimeout(
        () =>
          this.setState({
            inputChanged: false,
            inputValue: value
          }),
        500
      )
    })
  }

  render() {
    const { classes } = this.props
    const { searchType, inputChanged, inputValue } = this.state

    const searchTypes = [
      'startsWith',
      'contains',
      'endswith',
      'fullText',
      'similarity'
    ]

    return (
      <Fragment>
        <Typography variant="headline" gutterBottom>
          Search the Food Records
        </Typography>
        <FormControl className={classes.verticalMargin}>
          <Select
            value={searchType}
            onChange={this.handleFilterChange}
            name="searchType"
            displayEmpty
          >
            {searchTypes.map((searchType, index) => (
              <MenuItem key={index} value={searchType}>
                {searchType}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Change search type</FormHelperText>
        </FormControl>
        <FormControl>
          <Query
            skip={inputValue === '' || inputChanged}
            query={recordSearch}
            variables={{
              needle: inputValue,
              type: searchType
            }}
          >
            {({ loading, error, data = {}, refetch }) => {
              if (error) {
                return <Typography color="error">{error}</Typography>
              }

              const items = data.search
                ? data.search
                    .map(({ id, name }) => ({ key: id, value: name }))
                    .slice(0, 10)
                : null

              return (
                <Autocomplete
                  placeholder={'Search food database: '}
                  id="titus-autocomplete"
                  onChange={this.handleChange}
                  onInputChange={this.handleInputChange}
                  maxResults={10}
                  searchType={searchType}
                  items={items}
                  loading={inputValue !== '' && loading}
                />
              )
            }}
          </Query>
        </FormControl>
      </Fragment>
    )
  }
}

export default withStyles(styles)(RecordSearch)
