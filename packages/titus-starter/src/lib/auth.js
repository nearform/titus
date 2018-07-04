import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Auth = ({ user, loginComponent: Login, children }) => user === undefined ? <Login /> : children

Auth.propTypes = {
  user: PropTypes.object,
  loginComponent: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.app.user
})

export default connect(mapStateToProps)(Auth)
