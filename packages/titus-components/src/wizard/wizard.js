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
    {MaterialWizard}
  </HeadlessWizard>
)

Wizard.propTypes = {
  /** The main title of the wizard. */
  title: PropTypes.string,
  /** The message displayed when the wizard is complete. */
  finishedMessage: PropTypes.string,
  /** The default message displayed when trying to proceed further from a component that requires a value, and none was provided. */
  defaultRequiredMessage: PropTypes.string,
  /** The wizard steps. */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /** Callback function invoked when the wizard is complete. */
  onFinish: PropTypes.func
}

export default Wizard
