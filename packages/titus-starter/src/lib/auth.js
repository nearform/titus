import React from 'react'
import { connect } from 'react-redux'

const Auth = ({ user, loginComponent: Login, children }) => user === undefined ? <Login /> : children

const mapStateToProps = (state) => ({
  user: state.app.user
})

export default connect(mapStateToProps)(Auth);
