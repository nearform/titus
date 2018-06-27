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

  handleChange = item => this.props.onChange(item)
  itemToString = item => (item ? item.value : '')

  renderMaterial = props => (
    <div>
      <MaterialDownshift
        {...props}
        getSuggestions={this.getSuggestions}
        placeholder={this.props.placeholder}
        id={this.props.id}
      />
    </div>
  )

  getSuggestions = inputValue => {
    const { data, filterType, maxResults, onGetSuggestions } = this.props
    if (!inputValue) return []
    const max = maxResults || 5

    if (filterType) {
      if (
        ['startswith', 'contains', ''].indexOf(filterType.toLowerCase()) < 0
      ) {
        return onGetSuggestions(inputValue, filterType, max)
      }
    }

    const a = inputValue.toLowerCase()

    return (filterType === 'contains'
      ? data.filter(b => b.value.toLowerCase().indexOf(a) > -1)
      : data.filter(b => b.value.toLowerCase().startsWith(a))
    )
      .sort((a, b) => a.value.length - b.value.length)
      .splice(0, max)
  }

  render () {
    return (
      <Downshift onChange={this.handleChange} itemToString={this.itemToString}>
        {this.renderMaterial}
      </Downshift>
    )
  }
}

export default Autocomplete
