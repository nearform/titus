import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

class SimpleStep extends React.Component {
  stepSatisfyCheck = name => {
    const { handleSatisfied, stepIndex } = this.props
    const stepSatisfied = name && name.trim() !== ''
    handleSatisfied(stepIndex, stepSatisfied)
  }

  handleChange = e => {
    const { handleDataChanged, stepIndex } = this.props
    this.stepSatisfyCheck(e.target.value)
    const stepData = { comment: e.target.value }
    handleDataChanged(stepIndex, stepData)
  }

  render () {
    const { required, data } = this.props
    return (
      <React.Fragment>
        <TextField
          id='comment'
          label='Comment'
          required={required}
          value={data.comment ? data.comment : ''}
          onChange={this.handleChange}
          margin='normal'
        />
      </React.Fragment>
    )
  }
}

SimpleStep.propTypes = {
  stepIndex: PropTypes.number,
  handleSatisfied: PropTypes.func,
  handleDataChanged: PropTypes.func,
  required: PropTypes.bool,
  data: PropTypes.object
}

export default SimpleStep
