import React from 'react'
import PropTypes from 'prop-types'
import Delete from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
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

class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.boundHandleRemove = this.handleRemove.bind(this)
  }

  handleRemove(ev) {
    ev.preventDefault()

    return this.props.removeComment(this.props.comment)
  }

  renderAuthor(author) {
    if (author && author.username) {
      return <h5>{author.username} said</h5>
    }

    return <h5>Author should be here...</h5>
  }

  renderCommentContent(comment) {
    if (!comment.mentions || comment.mentions.length === 0) {
      return <p>{this.props.comment.content}</p>
    }

    let body = comment.content
    comment.mentions.forEach(mention => {
      if (typeof mention === 'string') {
        let re = new RegExp('^@' + mention + '|\\s@' + mention, 'g')
        body = body.replace(re, ` <b>@${mention}</b>`)
        return
      }

      if (typeof mention === 'object') {
        let re = new RegExp(
          '^@' + mention.username + '|\\s@' + mention.username,
          'g'
        )
        body = body.replace(re, ` <b>@${mention.username}</b>`)
      }
    })

    return <p dangerouslySetInnerHTML={{ __html: body.trim() }} />
  }

  static propTypes = {
    removeComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    classes: PropTypes.object
  }

  render() {
    return (
      <article className={this.props.classes.comment}>
        <header className={this.props.classes.commentHeader}>
          {this.renderAuthor(this.props.comment.author)}
          <button
            onClick={this.boundHandleRemove}
            className={this.props.classes.commentRemoveButton}
          >
            <Delete />
          </button>
        </header>

        {this.renderCommentContent(this.props.comment)}
      </article>
    )
  }
}

export default withStyles(styles)(Comment)
