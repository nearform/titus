import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = {
  root: {
    width: '100%'
  }
}
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
    const { classes, required, data } = this.props
    return (
      <div className={classes.root}>
        <TextField
          id='comment'
          label='Comment'
          required={required}
          value={data && data.comment ? data.comment : ''}
          onChange={this.handleChange}
          margin='normal'
        />
      </div>
    )
  }
}

SimpleStep.propTypes = {
  classes: PropTypes.object.isRequired,
  stepIndex: PropTypes.number,
  handleSatisfied: PropTypes.func,
  handleDataChanged: PropTypes.func,
  required: PropTypes.bool,
  data: PropTypes.object
}

export default withStyles(styles)(SimpleStep)
