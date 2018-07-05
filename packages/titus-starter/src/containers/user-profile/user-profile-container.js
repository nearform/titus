import { connect } from 'react-redux'
import Profile from './components/user-profile'
import { logOut } from '../../store/app/app-actions'

const mapStateToProps = (state) => ({
  user: state.app.user
})

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
