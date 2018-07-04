import { connect } from 'react-redux'
import Login from '../login/components/login-form'
import { logIn } from '../../store/app/app-actions'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(logIn(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
