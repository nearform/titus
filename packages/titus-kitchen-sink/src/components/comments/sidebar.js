import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  Drawer,
  Grid,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { withResource } from '@nearform/commentami-react-components'
import {
  CommentsList,
  withSidebars
} from '@nearform/commentami-react-components/dist/ui'
import { NewComment, Comment } from './'

const styles = () => {
  return {
    container: {
      width: '40vw'
    },
    item: {
      padding: '0 2em'
    },
    close: {
      padding: '1em 2em 0 2em'
    }
  }
}

class Sidebar extends Component {
  render() {
    const { classes, controller, commentami } = this.props

    return !controller.isActive(commentami.resource) ? null : (
      <Drawer
        anchor="right"
        open={true}
        onClose={() => controller.updateActive()}
      >
        <Grid
          container
          spacing={24}
          className={classes.container}
          direction="column"
          wrap="nowrap"
          alignItems="stretch"
        >
          <Grid
            container
            direction="row"
            justify="flex-end"
            className={classes.close}
          >
            <Tooltip title="Close Sidebar" placement="left">
              <IconButton
                className={classes.button}
                aria-label="Delete"
                onClick={e => {
                  e.preventDefault()

                  controller.updateActive()
                }}
              >
                <CloseIcon/>
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid className={classes.item}>
            <NewComment
              onSubmit={async comment => {
                await commentami.commentable.addComment(
                  controller.reference,
                  comment
                )
              }}
            />
          </Grid>

          <CommentsList
            className={classes.item}
            reference={controller.reference}
            commentComponent={Comment}
          />
        </Grid>
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  commentami: PropTypes.object.isRequired,
  controller: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(withSidebars(withResource(Sidebar)))
