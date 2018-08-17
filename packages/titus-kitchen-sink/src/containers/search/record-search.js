import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Autocomplete } from '@nearform/titus-components'

import { search } from '../../store/search/search-actions'

const styles = theme => ({
  verticalMargin: {
    marginBottom: theme.spacing.unit * 3
  }
})

class RecordSearch extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    search: PropTypes.func,
    searching: PropTypes.bool,
    error: PropTypes.bool,
    items: PropTypes.array
  }

  constructor (props) {
    super(props)
    this.state = {
      timerId: null,
      inputChanged: false,
      searchType: 'startsWith'
    }
  }

  handleFilterChange = event => {
    this.setState({ searchType: event.target.value })
  }

  handleChange = item => {
    alert('You selected: ' + item.value + ' (' + item.key + ')')
  }

  handleInputChange = ({ value }) => {
    this.setState({ inputChanged: true })
    clearTimeout(this.state.timerId) // cancel previous timer, we only want one request after the delay
    this.setState({
      timerId: setTimeout(() => {
        this.setState({ inputChanged: false })
        this.props.search(value, this.state.searchType)
      }, 500) // give user a chance to type before we call
    })
  }

  render () {
    const { classes, error, searching, items } = this.props
    const { inputChanged, searchType } = this.state

    if (error) {
      return <Typography color='error'>{error}</Typography>
    }

    const searchTypes = [
      'startsWith',
      'contains',
      'endswith',
      'fullText',
      'similarity'
    ]

    return (
      <Fragment>
        <Typography variant='headline' gutterBottom>
          Search the Food Records
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
          <Autocomplete
            placeholder={'Search food database: '}
            id='titus-autocomplete'
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            maxResults={10}
            searchType={searchType}
            items={inputChanged ? null : items}
            loading={inputChanged || searching ? 'true' : undefined}
          />
        </FormControl>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ search: { error, items, searching } }) => ({
  error,
  items,
  searching
})

const mapDispatchToProps = {
  search
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RecordSearch)
)
