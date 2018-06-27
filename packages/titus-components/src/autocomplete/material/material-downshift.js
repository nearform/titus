import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

function renderInput (inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot
        },
        ...InputProps
      }}
      {...other}
    />
  )
}

function renderSuggestion ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index
  const isSelected = selectedItem && selectedItem.value === suggestion.value

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.key}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.value}
    </MenuItem>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  inputRoot: {
    flexWrap: 'wrap'
  }
})

class MaterialDownshift extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    getInputProps: PropTypes.any,
    getItemProps: PropTypes.any,
    isOpen: PropTypes.bool,
    selectedItem: PropTypes.object,
    highlightedIndex: PropTypes.number,
    getSuggestions: PropTypes.func,
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string
  }

  render () {
    const {
      getInputProps,
      getItemProps,
      isOpen,
      selectedItem,
      highlightedIndex,
      getSuggestions,
      inputValue,
      classes,
      placeholder,
      id
    } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {renderInput({
            fullWidth: true,
            classes,
            InputProps: getInputProps({
              placeholder: placeholder,
              id: id
            })
          })}
          {isOpen ? (
            <Paper className={classes.paper} square>
              {getSuggestions(inputValue).map((suggestion, index) =>
                renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({
                    key: suggestion.key,
                    item: suggestion
                  }),
                  highlightedIndex,
                  selectedItem
                })
              )}
            </Paper>
          ) : null}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MaterialDownshift)
