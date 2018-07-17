import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Auth = ({ user, loginComponent, children }) => user === undefined ? loginComponent : children

Auth.propTypes = {
  user: PropTypes.object,
  loginComponent: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.app.user
})

export default connect(mapStateToProps)(Auth)
