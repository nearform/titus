import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  ListItemSecondaryAction
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { loadAllDietTypes } from '-!graphql-tag/loader!./queries.gql' // eslint-disable-line import/no-webpack-loader-syntax
import { DeleteButton } from './delete-button'
import { ToggleButton } from './toggle-button'

const styles = theme => ({
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

const DietaryTypesQuery = ({ classes, userId }) => (
  <Query query={loadAllDietTypes}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <div className={classes.progressWrapper}>
            <CircularProgress className={classes.progress} />
          </div>
        )
      }

      if (error) {
        return (
          <Typography variant='body1' color='error'>
            Oops, There was a error fetching that data!
          </Typography>
        )
      }

      return (
        <List className={classes.list}>
          {data &&
            data.allDietTypes &&
            data.allDietTypes.length &&
            data.allDietTypes.map(
              ({ id, name, visible }) =>
                userId !== 'MrUser' || (userId === 'MrUser' && visible) ? (
                  <ListItem key={id}>
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction>
                      {userId === 'MrsAdmin' && <DeleteButton id={id} />}
                      {(userId === 'MrsAdmin' || userId === 'MissEditor') && (
                        <ToggleButton id={id}>
                          {visible ? <Visibility /> : <VisibilityOff />}
                        </ToggleButton>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null
            )}
        </List>
      )
    }}
  </Query>
)

DietaryTypesQuery.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export const DietaryTypes = withStyles(styles)(DietaryTypesQuery)
