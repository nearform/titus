import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import MaterialDownshift from './material/material-downshift'

class Autocomplete extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    filterType: PropTypes.string,
    maxResults: PropTypes.number,
    onGetSuggestions: PropTypes.func
  }

  // FIXME Is it possible to have a null Item?
  // The items requires a "key" attribute as well, and if a null valus is passed Downshift thrown an error
  itemToString = item => (item ? item.value : '')

  renderMaterial = props => {
    return (
      <div>
        <MaterialDownshift
          {...props}
          getSuggestions={this.getSuggestions}
          placeholder={this.props.placeholder}
          id={this.props.id}
        />
      </div>
    )
  }

  getSuggestions = inputValue => {
    if (!inputValue) return []
    const {
      data = [],
      filterType,
      maxResults = 5,
      onGetSuggestions
    } = this.props

    if (filterType) {
      if (!['startswith', 'contains', ''].includes(filterType.toLowerCase())) {
        return onGetSuggestions(inputValue, filterType, maxResults)
      }
    }

    const a = inputValue.toLowerCase()

    return (filterType && filterType.toLowerCase() === 'contains'
      ? data.filter(b => b.value.toLowerCase().indexOf(a) > -1)
      : data.filter(b => b.value.toLowerCase().startsWith(a))
    )
      .sort((a, b) => a.value.length - b.value.length)
      .splice(0, maxResults)
  }

  render () {
    return (
      <Downshift
        onChange={this.props.onChange}
        itemToString={this.itemToString}
      >
        {this.renderMaterial}
      </Downshift>
    )
  }
}

export default Autocomplete
