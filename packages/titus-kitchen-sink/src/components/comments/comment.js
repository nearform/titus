import React from 'react'
import PropTypes from 'prop-types'
import { Delete as DeleteIcon } from '@material-ui/icons'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  withStyles,
  colors
} from '@material-ui/core'

const styles = theme => ({
  card: {
    margin: '1em 0'
  },
  avatar: {
    backgroundColor: colors.red[500]
  },
  comment: {
    borderBottom: '1px solid black',
    '& > p': {
      margin: '8px 0'
    },
    marginBottom: '16px'
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h5': {
      margin: '0px'
    }
  },
  commentRemoveButton: {
    width: '32px',
    heigth: '32px',
    background: 'transparent',
    borderRadius: '0px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    }
  }
})

const Comment = ({ comment, classes, removeComment }) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {(comment.author &&
              comment.author.username &&
              comment.author.username.toUpperCase().slice(0, 1)) ||
              'T'}
          </Avatar>
        }
        action={
          <IconButton
            onClick={e => {
              e.preventDefault()

              removeComment(comment)
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
        title={
          comment.author &&
          comment.author.username
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        }
        subheader=""
      />
      <CardContent>
        <Typography component="p">
          <span
            dangerouslySetInnerHTML={{
              __html: comment.content.replace(/@(\w+)/g, '<b>@$1</b>')
            }}
          />
        </Typography>
      </CardContent>
    </Card>
  )
}

Comment.propTypes = {
  removeComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(Comment)
