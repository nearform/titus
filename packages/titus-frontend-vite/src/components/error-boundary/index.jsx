import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <p>{this.props.t('errors.loadingFailed')}</p>
    }

    return this.props.children
  }
}

export default withTranslation()(ErrorBoundary)
