import { connect } from 'react-redux'
import Login from '../../components/login/login'
import {logIn} from '../../store/app/app-actions'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e) => {

      e.preventDefault();
      dispatch(logIn({user:e.target.username.value}))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);