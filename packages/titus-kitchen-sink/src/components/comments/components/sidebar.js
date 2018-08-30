import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { createPortal } from 'react-dom'
import { withResource } from '@nearform/commentami-react-components'
import { CommentsList, NewCommentForm, withSidebars } from '@nearform/commentami-react-components/dist/ui'
import Close from '@material-ui/icons/Close'

import Comment from './comment'

const styles = theme => {
  return ({
    sidebarContainer: {
      position: 'absolute',
      top: '70px',
      right: 0,
      zIndex: 1000,
      backgroundColor: '#cecece',
      padding: '20px',
      width: '350px'
    },
    sidebarHeaderButton: {
      background: 'transparent',
      borderRadius: '0px',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      '&:focus': {
        outline: 'none'
      },
      margin: '16px 0px',
      padding: '0px',
      display: 'flex',
      alignItems: 'center'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      '& button': {
        margin: '10px 0px 0px 0px'
      },
      margin: '10px 0px',
      padding: '10px 0px'
    }
  })
}

export const Sidebar = withStyles(styles)(withSidebars(
  withResource(
    class extends React.Component {
      constructor (props) {
        super(props)

        this.boundHandleClose = this.handleClose.bind(this)
      }

      handleClose (ev) {
        ev.preventDefault()

        this.props.controller.updateActive()
      }

      static propTypes = {
        commentami: PropTypes.object.isRequired,
        controller: PropTypes.object.isRequired,
        classes: PropTypes.object
      }

      render () {
        const {
          controller,
          commentami: { resource }
        } = this.props

        if (!controller.isActive(resource)) return false

        const reference = this.props.controller.reference

        return createPortal(
          <aside className={this.props.classes.sidebarContainer}>
            <button className={this.props.classes.sidebarHeaderButton} onClick={this.boundHandleClose}>
              <Close />
              <span>Hide sidebar</span>
            </button>
            <CommentsList reference={reference} commentComponent={Comment} />
            <NewCommentForm reference={reference} className={this.props.classes.formContainer} />
          </aside>,
          document.body
        )
      }
    }
  )
))
