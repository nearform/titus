import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button
} from '@material-ui/core'
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { loader } from 'graphql.macro'

const loadFoodData = loader('./queries/loadFoodData.graphql')
const deleteFood = loader('./queries/deleteFood.graphql')

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight: {
    backgroundColor: lighten(theme.palette.primary.light, 0.85)
  },
  spacer: {
    flex: '1 1 100%'
  },
  title: {
    flex: '0 0 auto'
  },
  rightControls: {
    flex: '0 0 auto'
  },
  rightItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexEnd'
  },
  actions: {
    flex: '0 0 auto'
  },
  numSelected: {
    flex: '1 1 auto',
    paddingRight: theme.spacing.unit * 3
  }
})

const handleDelete = ({ deleteFood, rows }) => e => {
  const ids = rows
    .filter(({ selected }) => selected)
    .map(row => row.rowData.find(r => r.accessor === 'id').data)

  return deleteFood({
    variables: { ids },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteFoods: {
        __typename: 'DeleteResult',
        ids,
        typeName: 'Food',
        count: ids.length,
        operation: 'delete'
      }
    }
  })
}

const TableToolbar = ({ numSelected, classes, title, rows, onAddClick }) => (
  <Mutation
    mutation={deleteFood}
    update={(cache, { data: { deleteFoods } }) => {
      const { ids } = deleteFoods
      const data = cache.readQuery({ query: loadFoodData })

      data.allFood = data.allFood.filter(({ id }) => !ids.includes(id))
      cache.writeQuery({ query: loadFoodData, data })
    }}
  >
    {deleteFood => (
      <Toolbar className={classNames({ [classes.highlight]: numSelected > 0 })}>
        <div className={classes.title}>
          <Typography
            variant="title"
            color={numSelected > 0 ? 'primary' : 'inherit'}
          >
            {title}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.rightControls}>
          {!numSelected && (
            <div className={classes.actions}>
              <Tooltip title="Add New Food Item">
                <Button
                  mini
                  variant="fab"
                  aria-label="Add New Food Item"
                  color="primary"
                  onClick={onAddClick}
                >
                  <AddIcon />
                </Button>
              </Tooltip>
            </div>
          )}
          {numSelected > 0 && (
            <div className={classes.rightItems}>
              <div className={classes.numSelected}>
                <Typography variant="body1" color="primary">
                  <strong>{numSelected}</strong> selected
                </Typography>
              </div>
              <div className={classes.actions}>
                <Tooltip title="Delete">
                  <IconButton
                    variant="fab"
                    aria-label="Delete"
                    color="primary"
                    className={classes.button}
                    onClick={handleDelete({ deleteFood, rows })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </Toolbar>
    )}
  </Mutation>
)

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddClick: PropTypes.func.isRequired
}

export default withStyles(styles)(TableToolbar)
