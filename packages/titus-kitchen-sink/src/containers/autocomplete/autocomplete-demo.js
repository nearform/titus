import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Autocomplete } from '@nearform/titus-components'
import { countries } from './mock/countries'
import levenshtein from 'fast-levenshtein'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3
  },

  verticalMargin: {
    marginBottom: theme.spacing.unit * 3
  }
})

class AutocompleteDemo extends React.Component {
  static PropTypes = {
    items: PropTypes.array,
    handleChange: PropTypes.func
  }

  state = {
    filterType: 'startswith'
  }

  handleChange = item => {
    alert('You selected: ' + item.value + ' (' + item.key + ')')
  }

  handleFilterChange = event => {
    this.setState({ filterType: event.target.value })
  }

  handleGetSuggestions = (inputValue, filterType, maxResults) => {
    // this is just a simple example of overriding the filterType with a custom callback
    // a db query could be done here for example, this is a bit contrived and would be slow
    // with huge database, but does a levenshtein distance and returns closest matches
    const a = inputValue.toLowerCase()
    if (filterType !== 'levenshtein') return []

    return countries
      .map(country => {
        let distance = 100
        if (a.length < country.value.length) {
          const b = country.value.toLowerCase()
          distance = levenshtein.get(a, b)
        }
        return {
          key: country.key,
          value: country.value,
          distance: distance
        }
      })
      .sort((x, y) => x.distance - y.distance)
      .splice(0, maxResults)
  }

  render () {
    const { classes } = this.props
    const { filterType } = this.state
    return (
      <Paper className={classes.root}>
        <Typography variant='headline' gutterBottom>
          Autocomplete Demo
        </Typography>
        <Typography variant='subheading' gutterBottom>
          This autocomplete component is built on PayPal's downshift with a
          material-ui render prop.
        </Typography>
        <Typography variant='body1' paragraph>
          <strong>
            Select a sort filter from the list below and then start typing a
            country name:
          </strong>
        </Typography>
        <FormControl className={classes.verticalMargin}>
          <Select
            value={filterType}
            onChange={this.handleFilterChange}
            name='filterType'
            displayEmpty
          >
            <MenuItem value='startswith'>startswith (default)</MenuItem>
            <MenuItem value='contains'>contains</MenuItem>
            <MenuItem value='levenshtein'>levenshtein (custom)</MenuItem>
          </Select>
          <FormHelperText>Change an autocomplete filter type</FormHelperText>
        </FormControl>

        <FormControl>
          <Autocomplete
            placeholder={'Find a country using the filterType: ' + filterType}
            id='titus-autocomplete'
            data={filterType !== 'levenshtein' ? countries : null}
            onChange={this.handleChange}
            onGetSuggestions={this.handleGetSuggestions}
            maxResults={10}
            filterType={filterType}
          />
        </FormControl>
      </Paper>
    )
  }
}

AutocompleteDemo.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(AutocompleteDemo)
