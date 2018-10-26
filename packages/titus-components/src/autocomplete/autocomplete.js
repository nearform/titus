import React from 'react'
import T from 'prop-types'
import Downshift from 'downshift'
import MaterialDownshift from './material/material-downshift'

class Autocomplete extends React.Component {
  static propTypes = {
    /** The items used to populate the autocomplete list with a static list of elements. */
    data: T.arrayOf(T.shape({ key: T.string, value: T.string })),
    /** Callback function invoked to retrieve a dynamic list of items, provided in the `items` prop. */
    onInputChange: T.func,
    /** Callback function invoked when an item is selected from the list. */
    onChange: T.func,
    /** The input element placeholder. */
    placeholder: T.string,
    /** The ID of the rendered input element. */
    id: T.string,
    /** The type of filter to use to match autocomplete items with user input. */
    filterType: T.oneOf(['contains', 'startsWith']),
    /** Maximum number of results returned in the autocomplete list. */
    maxResults: T.number,
    /** Whether to show a loading indicator when loading suggestions. */
    loading: T.bool,
    /** The items to used to populate the autocomplete list dynamically after responding to the `onInputChange` callback. */
    items: T.arrayOf(T.shape({ key: T.string, value: T.string })),
    /** If the input element is required. */
    required: T.bool,
    /** If the input element is disabled. */
    disabled: T.bool,
    /** If the input element is readOnly. */
    readOnly: T.bool,
    /** If the input element is invalid. */
    error: T.bool,
    /** The label for the input element. */
    label: T.string,
    /** The helper text for the input element. */
    helperText: T.string
  }

  static defaultProps = {
    filterType: 'startsWith',
    maxResults: 5
  }

  state = {
    internalItems: null
  }

  renderMaterial = props => {
    const {
      props: {
        placeholder,
        id,
        items,
        loading,
        onInputChange,
        required,
        disabled,
        readOnly,
        error,
        label,
        helperText
      },
      state: { internalItems },
      handleInputChange
    } = this

    return (
      <div>
        <MaterialDownshift
          {...props}
          items={onInputChange ? items : internalItems}
          loading={loading}
          placeholder={placeholder}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
          label={label}
          helperText={helperText}
          onInputChange={handleInputChange}
        />
      </div>
    )
  }

  handleInputChange = ({ target: { value } }) => {
    const { data, filterType, maxResults, onInputChange } = this.props

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

  render() {
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
