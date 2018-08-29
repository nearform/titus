import React from 'react'
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
import { keywordSearch } from '../../queries'

const styles = theme => ({
  verticalMargin: {
    marginBottom: theme.spacing.unit * 3
  }
})

class KeywordSearch extends React.Component {
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

  render () {
    const { classes } = this.props
    const { searchType, inputChanged, inputValue } = this.state

    const searchTypes = [
      'similarity',
      'startsWith',
      'contains',
      'endsWith',
      'levenshtein',
      'soundex',
      'metaphone'
    ]

    return (
      <React.Fragment>
        <Typography variant='headline' gutterBottom>
          Search Food Keywords
        </Typography>
        <FormControl className={classes.verticalMargin}>
          <Select
            value={searchType}
            onChange={this.handleFilterChange}
            name='searchType'
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
            query={keywordSearch}
            variables={{
              needle: inputValue,
              type: searchType
            }}
          >
            {({ loading, error, data, refetch }) => {
              if (error) {
                return <Typography color='error'>{error}</Typography>
              }

              return (
                <Autocomplete
                  placeholder={'Search food keywords: '}
                  id='titus-autocomplete'
                  onChange={this.handleChange}
                  onInputChange={this.handleInputChange}
                  maxResults={10}
                  searchType={searchType}
                  items={
                    inputValue !== '' && data.keywordSearch
                      ? data.keywordSearch
                        .map(({ word, score }, index) => ({
                          key: `${index}-${word}`,
                          value: word,
                          score: score
                        }))
                        .slice(0, 10)
                      : null
                  }
                  loading={inputValue !== '' && loading}
                />
              )
            }}
          </Query>
        </FormControl>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(KeywordSearch)
