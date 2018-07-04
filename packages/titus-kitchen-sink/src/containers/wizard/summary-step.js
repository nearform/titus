import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = {
  root: {
    width: '100%'
  }
}
class WizardSummaryStep extends React.Component {
  handleChange = e => {
    const { handleDataChanged, handleSatisfied, stepIndex } = this.props
    const stepData = { confirmed: e.target.checked }
    handleDataChanged(stepIndex, stepData)
    handleSatisfied(stepIndex, stepData.confirmed)
  }

  render () {
    const { classes, stepsData, stepsInfo, data } = this.props

    return (
      <div className={classes.root}>
        {stepsInfo.slice(0, stepsInfo.length - 1).map((stepInfo, index) => {
          return (
            <div key={index}>
              <ExpansionPanel key={stepInfo.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='subheading' gutterBottom>
                    Step {index + 1} - {stepInfo.title}
                  </Typography>
                  <Typography
                    variant='subheading'
                    color='textSecondary'
                    gutterBottom
                  >
                    : {stepInfo.description}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography variant='body1' gutterBottom>
                    Step Data: {JSON.stringify(stepsData[index])}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          )
        })}
        <Divider />
        <Switch
          checked={data.confirmed}
          onChange={this.handleChange}
          value='stepSatisfied'
        />
      </div>
    )
  }
}

WizardSummaryStep.propTypes = {
  classes: PropTypes.object.isRequired,
  stepIndex: PropTypes.number,
  handleSatisfied: PropTypes.func,
  handleDataChanged: PropTypes.func,
  data: PropTypes.object,
  stepsData: PropTypes.array,
  stepsInfo: PropTypes.array
}

export default withStyles(styles)(WizardSummaryStep)
