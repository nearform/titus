import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import LinearProgress from '@material-ui/core/LinearProgress'

const Input = ({ inputProps, classes, ref, ...other }) => (
  <div className={classes.inputRoot}>
    <TextField
      InputProps={{
        inputRef: ref,
        ...inputProps
      }}
      {...other}
    />
    {other.loading && <LinearProgress />}
  </div>
)

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  inputProps: PropTypes.any,
  ref: PropTypes.any,
  loading: PropTypes.any
}

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
    flexGrow: 1
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
    position: 'relative',
    flexWrap: 'wrap'
  }
})

const MaterialDownshift = ({
  getInputProps,
  getItemProps,
  isOpen,
  selectedItem,
  highlightedIndex,
  classes,
  placeholder,
  id,
  items,
  onInputChange,
  loading
}) => (
  <div className={classes.root}>
    <div className={classes.container}>
      {Input({
        fullWidth: true,
        loading: loading,
        classes,
        inputProps: getInputProps({
          onChange: onInputChange,
          placeholder: placeholder,
          id: id
        })
      })}
      {isOpen &&
        items && (
        <Paper className={classes.paper} square>
          {items.map((suggestion, index) =>
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
      )}
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
  placeholder: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.any,
  onInputChange: PropTypes.func,
  items: PropTypes.array
}

export default withStyles(styles)(MaterialDownshift)
