import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Switch,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

class WizardSummaryStep extends Component {
  handleChange = event => {
    const { handleDataChanged, handleSatisfied, stepIndex } = this.props
    const stepData = { confirmed: event.target.checked }
    handleDataChanged(stepIndex, stepData)
    handleSatisfied(stepIndex, stepData.confirmed)
  }

  render() {
    const { stepsData, stepsInfo, data } = this.props

    return (
      <>
        {stepsInfo.slice(0, -1).map((stepInfo, index) => {
          return (
            <div key={index}>
              <ExpansionPanel key={stepInfo.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography variant="subheading" gutterBottom>
                    Step {index + 1} - {stepInfo.title}
                  </Typography>
                  <Typography
                    variant="subheading"
                    color="textSecondary"
                    gutterBottom
                  >
                    : {stepInfo.description}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography variant="body1" gutterBottom>
                    Step Data: {JSON.stringify(stepsData[index])}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          )
        })}
        <Divider/>
        <Switch
          checked={data.confirmed}
          onChange={this.handleChange}
          value="stepSatisfied"
        />
      </>
    )
  }
}

WizardSummaryStep.propTypes = {
  stepIndex: PropTypes.number,
  handleSatisfied: PropTypes.func,
  handleDataChanged: PropTypes.func,
  data: PropTypes.object,
  stepsData: PropTypes.array,
  stepsInfo: PropTypes.array
}

export default WizardSummaryStep
