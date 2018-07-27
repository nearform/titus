import { withResource } from '@nearform/commentami-react-components'
import { CommentsList, NewCommentForm, withSidebars } from '@nearform/commentami-react-components/dist/ui'
import React from 'react'
import { createPortal } from 'react-dom'
import { Comment } from './comment'

export const Sidebar = withSidebars(
  withResource(
    class extends React.Component {
      constructor(props) {
        super(props)

        this.boundHandleClose = this.handleClose.bind(this)
      }

      handleClose(ev) {
        ev.preventDefault()

        this.props.controller.updateActive()
      }

      render() {
        const {
          controller,
          commentami: { resource }
        } = this.props

        if (!controller.isActive(resource)) return false

        const reference = this.props.controller.reference

        return createPortal(
          <aside style={{
            position: 'absolute',
            top: '70px',
            right: 0,
            zIndex: 1000,
            backgroundColor: '#cecece',
            padding: '20px'
          }}>
            <header>
              <h1>Comments</h1>
              <button onClick={this.boundHandleClose}>
                Close X
              </button>
            </header>
            <NewCommentForm reference={reference} />
            <CommentsList reference={reference} commentComponent={Comment} />
          </aside>,
          document.body
        )
      }
    }
  )
)
