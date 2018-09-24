import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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

class AutocompleteDemo extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  }

  state = {
    filterType: 'startswith',
    timerId: null,
    items: null,
    loading: false
  }

  handleChange = item => {
    alert('You selected: ' + item.value + ' (' + item.key + ')')
  }

  handleFilterChange = event => {
    this.setState({ filterType: event.target.value })
  }

  handleGetSuggestions = ({ value, maxResults }) => {
    clearTimeout(this.state.timerId) // cancel previous timer, we only want one request after the delay
    this.setState({ loading: true })

    const a = value.toLowerCase()

    this.setState({
      timerId: setTimeout(() => {
        const items = countries
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

        this.setState({
          loading: false,
          items: items
        })
      }, 500)
    })
  }

  render() {
    const { classes } = this.props
    const { filterType, loading, items } = this.state
    return (
      <div className={classes.root}>
        <Typography variant="headline" gutterBottom>
          Autocomplete Demo
        </Typography>
        <Typography variant="subheading" gutterBottom>
          This autocomplete component is built on PayPal's downshift with a
          material-ui render prop.
        </Typography>
        <Paper
          className={classNames(classes.paperPadding, classes.verticalMargin)}
        >
          <Typography variant="body1" paragraph>
            <strong>
              Select a search filter from the list below and then start typing a
              country name:
            </strong>
          </Typography>
          <FormControl className={classes.verticalMargin}>
            <Select
              value={filterType}
              onChange={this.handleFilterChange}
              name="filterType"
              displayEmpty
            >
              <MenuItem value="startswith">startswith (default)</MenuItem>
              <MenuItem value="contains">contains</MenuItem>
            </Select>
            <FormHelperText>Change an autocomplete filter type</FormHelperText>
          </FormControl>

          <FormControl>
            <Autocomplete
              placeholder={'Find a country using the filterType: ' + filterType}
              id="titus-autocomplete"
              data={filterType !== 'levenshtein' ? countries : null}
              onChange={this.handleChange}
              maxResults={10}
              filterType={filterType}
            />
          </FormControl>
        </Paper>

        <Paper className={classes.paperPadding}>
          <Typography variant="body1" paragraph>
            <strong>
              This uses a custom search filter algorithm implemented in this
              container (in this case fast-levenshtein):
            </strong>
          </Typography>
          <FormControl>
            <Autocomplete
              placeholder={
                'Find a country using custom algorithm (levenshtein)'
              }
              id="titus-autocomplete"
              onChange={this.handleChange}
              onInputChange={this.handleGetSuggestions}
              maxResults={10}
              loading={loading ? 'true' : undefined}
              items={items}
            />
          </FormControl>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AutocompleteDemo)
