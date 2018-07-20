import { connect } from 'react-redux'
import Login from '../login/components/login-form'
import { logIn } from '../../store/app/app-actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (data, authProvider) => {
    ownProps.authProvider.login(data)
      .then(
        user => dispatch(logIn(user)),
        err => {
          // here we might want to call something like: dispatch(authError(err))
          console.warn(err)
        }
      )
  }
})

export default connect(null, mapDispatchToProps)(Login)
