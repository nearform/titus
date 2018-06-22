import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'

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

class TableToolbar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string,
    onDelete: PropTypes.func
  }

  handleDelete = () => {
    this.props.onDelete()
  }

  render () {
    const { numSelected, classes, title } = this.props
    return (
      <Toolbar className={classNames({ [classes.highlight]: numSelected > 0 })}>
        <div className={classes.title}>
          <Typography
            variant='title'
            color={numSelected > 0 ? 'primary' : 'inherit'}
          >
            {title}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.rightControls}>
          {numSelected > 0 && (
            <div className={classes.rightItems}>
              <div className={classes.numSelected}>
                <Typography variant='body1' color='primary'>
                  <strong>{numSelected}</strong> selected
                </Typography>
              </div>
              <div className={classes.actions}>
                <Tooltip title='Delete'>
                  <IconButton
                    variant='fab'
                    aria-label='Delete'
                    color='primary'
                    className={classes.button}
                    onClick={this.handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </Toolbar>
    )
  }
}

export default withStyles(styles)(TableToolbar)
