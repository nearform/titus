import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadDietTypes, toggleDietTypeVisibility, deleteDietType } from '../../store/api/api-actions'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3
  },
  formControl: {
    maxWidth: 300,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressWrapper: {
    margin: 'auto 50%',
    paddingBottom: theme.spacing.unit * 3
  },
  list: {
    maxWidth: 600
  }
})

class Authorization extends Component {
  static propTypes = {
    loadingDietTypes: PropTypes.bool,
    error: PropTypes.any,
    dietTypes: PropTypes.array,
    toggleDietTypeVisibility: PropTypes.func.isRequired,
    deleteDietType: PropTypes.func.isRequired,
    loadDietTypes: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    // NOTE: This, or something similar to help identify a user, would usually
    // come from an authentication service
    localStorage.setItem('titus-user', 'MrsAdmin')

    this.state = {
      userId: localStorage.getItem('titus-user')
    }

    this.props.loadDietTypes()
  }

  deleteDietType = id => event => {
    this.props.deleteDietType(id)
  }

  changeUser = ({ target: { value: userId } }) => {
    localStorage.setItem('titus-user', userId)
    this.setState({ userId })
    this.props.loadDietTypes()
  }

  toggleVisibility = id => event => {
    this.props.toggleDietTypeVisibility(id)
  }

  render () {
    const { classes, error, loadingDietTypes, dietTypes } = this.props
    const { userId } = this.state

    const toDisplay = dietTypes && userId === 'MrUser' ? dietTypes.filter(({visible}) => visible) : dietTypes

    return (
      <Paper className={classes.root}>
        <Typography variant='headline' gutterBottom>
          Authorization Demo
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='select-user'>Switch User</InputLabel>
          <Select
            value={userId}
            onChange={this.changeUser}
            inputProps={{
              id: 'select-user'
            }}
          >
            <MenuItem value='MrsAdmin'>Mrs Admin</MenuItem>
            <MenuItem value='MissEditor'>Miss Editor</MenuItem>
            <MenuItem value='MrUser'>Mr User</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Typography variant='headline' gutterBottom>
            Dietary Types
          </Typography>
        </div>
        <List className={classes.list}>
          {loadingDietTypes &&
            <div className={classes.progressWrapper}>
              <CircularProgress className={classes.progress} />
            </div>
          }
          {toDisplay && toDisplay.map(({id, name, visible}) => (
            <ListItem key={id}>
              <ListItemText
                primary={name}
              />
              <ListItemSecondaryAction>
                {userId === 'MrsAdmin' &&
                  <IconButton aria-label='Delete' onClick={this.deleteDietType(id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                {(userId === 'MrsAdmin' || userId === 'MissEditor') &&
                  <IconButton aria-label='Visibility Toggle' onClick={this.toggleVisibility(id)}>
                    {visible && <Visibility />}
                    {!visible && <VisibilityOff />}
                  </IconButton>
                }
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {error && <Typography variant='body1' color='error'>{error}</Typography>}
      </Paper>
    )
  }
}

const mapStateToProps = ({ api: { dietTypes, loadingDietTypes, dietTypesError: error } }) => ({
  dietTypes,
  loadingDietTypes,
  error
})

const mapDispatchToProps = {
  loadDietTypes,
  toggleDietTypeVisibility,
  deleteDietType
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Authorization))
