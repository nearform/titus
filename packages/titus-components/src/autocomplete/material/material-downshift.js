import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { InputAdornment } from '@material-ui/core'

const Input = ({ InputProps, classes, ref, ...other }) => (
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

const Suggestion = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) => (
  <MenuItem
    {...itemProps}
    key={suggestion.key}
    selected={highlightedIndex === index}
    component='div'
    style={{
      fontWeight:
        selectedItem && selectedItem.value === suggestion.value ? 500 : 400
    }}
  >
    {suggestion.value}
  </MenuItem>
)

Suggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ value: PropTypes.string }).isRequired
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

const MaterialDownshift = ({
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
}) => (
  <div className={classes.root}>
    <div className={classes.container}>
      {Input({
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
            Suggestion({
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

MaterialDownshift.propTypes = {
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

export default withStyles(styles)(MaterialDownshift)
