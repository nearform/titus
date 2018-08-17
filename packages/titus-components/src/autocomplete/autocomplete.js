import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import MaterialDownshift from './material/material-downshift'

class Autocomplete extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onInputChange: PropTypes.func,
    onChange: PropTypes.func,
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    filterType: PropTypes.string,
    maxResults: PropTypes.number,
    loading: PropTypes.any,
    items: PropTypes.array
  }

  constructor (props) {
    super(props)
    // if all data is passed in, we're managing this state internally
    // ourselves to suggested listitems
    this.state = { internalItems: null }
  }

  renderMaterial = props => {
    const {
      props: { placeholder, id, items, loading, onInputChange },
      state: { internalItems },
      handleInputChange
    } = this

    return (
      <div>
        <MaterialDownshift
          {...props}
          items={onInputChange ? items : internalItems}
          loading={loading ? 'true' : undefined}
          placeholder={placeholder}
          id={id}
          onInputChange={handleInputChange}
        />
      </div>
    )
  }

  handleInputChange = ({ target: { value } }) => {
    const {
      data,
      filterType = 'startsWith',
      maxResults = 5,
      onInputChange
    } = this.props

    if (onInputChange) {
      // suggestions handled by container
      onInputChange({ value, filterType, maxResults })
    } else {
      let newItems = null
      this.setState({ internalItems: newItems })
      if (!value || !data) return
      const a = value.toLowerCase()

      newItems = (filterType.toLowerCase() === 'contains'
        ? data.filter(b => b.value.toLowerCase().indexOf(a) > -1)
        : data.filter(b => b.value.toLowerCase().startsWith(a))
      )
        .sort((a, b) => a.value.length - b.value.length)
        .splice(0, maxResults)
      this.setState({ internalItems: newItems })
    }
  }

  itemToString = item => (item ? item.value : '')

  render () {
    const {
      props: { onChange },
      renderMaterial,
      itemToString
    } = this

    return (
      <Downshift onChange={onChange} itemToString={itemToString}>
        {renderMaterial}
      </Downshift>
    )
  }
}

export default Autocomplete
