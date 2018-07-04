import React from 'react'
import PropTypes from 'prop-types'
import HeadlessWizard from './headless-wizard'
import MaterialWizard from './material/material-wizard'

class Wizard extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    finishedMessage: PropTypes.string,
    defaultRequiredMessage: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    onFinish: PropTypes.func
  }

  renderMaterial = props => <MaterialWizard {...props} />

  render () {
    const {
      title,
      finishedMessage,
      defaultRequiredMessage,
      children,
      onFinish
    } = this.props
    return (
      <HeadlessWizard
        title={title}
        finishedMessage={finishedMessage}
        defaultRequiredMessage={defaultRequiredMessage}
        steps={children}
        onFinish={onFinish}
      >
        {this.renderMaterial}
      </HeadlessWizard>
    )
  }
}

export default Wizard
