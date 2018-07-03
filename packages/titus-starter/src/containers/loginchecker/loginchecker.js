import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames';

const style = theme => ({
  centered:{
    height    : '100%',
    display   : 'flex',
    alignItems: 'center'
  }
})

const LoginChecker = (props) => {
    const {classes, className} = props,
          centered=props.user === undefined ? classes.centered : '';

    return (
        <div className={classNames(centered,className)}>
          {
            props.user === undefined ?
            <props.loginComponent />
              :
            props.children
          }
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {

    return {
        ...ownProps,
        user: state.app.user
    }
}

export default connect(mapStateToProps)(withStyles(style)(LoginChecker));
