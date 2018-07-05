import React from 'react'
import PropTypes from 'prop-types'
import HeadlessWizard from './headless-wizard'
import MaterialWizard from './material/material-wizard'

const Wizard = ({
  title,
  finishedMessage,
  defaultRequiredMessage,
  children,
  onFinish
}) => (
  <HeadlessWizard
    title={title}
    finishedMessage={finishedMessage}
    defaultRequiredMessage={defaultRequiredMessage}
    steps={children}
    onFinish={onFinish}
  >
    {props => <MaterialWizard {...props} />}
  </HeadlessWizard>
)

Wizard.propTypes = {
  title: PropTypes.string,
  finishedMessage: PropTypes.string,
  defaultRequiredMessage: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onFinish: PropTypes.func
}

export default Wizard
