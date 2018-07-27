import React from 'react'

export class Comment extends React.Component {
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

    return null
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
        let re = new RegExp('^@' + mention.username + '|\\s@' + mention.username, 'g')
        body = body.replace(re, ` <b>@${mention.username}</b>`)
      }
    })

    return <p dangerouslySetInnerHTML={{ __html: body.trim() }} />
  }

  render() {
    console.log('this.props.comment', this.props.comment)
    return (
      <article>
        <header>
          {this.renderAuthor(this.props.comment.author)}
          <button onClick={this.boundHandleRemove}>
            Delete
           </button>
        </header>

        {this.renderCommentContent(this.props.comment)}
      </article>
    )
  }
}
