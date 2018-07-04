import React from 'react'
import PropTypes from 'prop-types'

const WizardStep = ({
  id,
  title,
  description,
  required,
  requiredMessage,
  stepsDataRequired,
  data,
  stepIndex,
  handleDataChanged,
  handleSatisfied,
  stepsData,
  stepsInfo,
  children
}) => (
  <div>
    {children({
      id,
      title,
      description,
      required,
      requiredMessage,
      stepsDataRequired,
      data,
      stepIndex,
      handleDataChanged,
      handleSatisfied,
      stepsData,
      stepsInfo
    })}
  </div>
)

WizardStep.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  requiredMessage: PropTypes.string,
  stepsDataRequired: PropTypes.bool,
  children: PropTypes.func.isRequired,
  handleDataChanged: PropTypes.func,
  handleSatisfied: PropTypes.func,
  data: PropTypes.object,
  stepIndex: PropTypes.number,
  stepsData: PropTypes.array,
  stepsInfo: PropTypes.array
}

// everything to children is provided when declaring component
// everything after is sent in after render and wired up by Wizard
export default WizardStep
