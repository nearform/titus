import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%'
  },
  title: {
    textAlign: 'center'
  },
  wizard: {
    padding: theme.spacing.unit * 3
  },
  component: {
    width: '100%',
    display: 'block',
    textAlign: 'center'
  },
  controls: {
    textAlign: 'center'
  },
  rightSpacing: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  hide: {
    display: 'none'
  }
})

const MaterialWizard = ({
  classes,
  props: { title, finishedMessage },
  events: { next, back, reset },
  state: { steps, numSteps, stepIndex, stepsInfo, requiredMessage, finished }
}) => (
  <div className={classes.root}>
    <Paper className={classes.wizard}>
      <div className={classes.title}>
        <Typography variant='display1' gutterBottom data-testid='wizard-title'>
          {title}
        </Typography>
        <Typography variant='headline' gutterBottom data-testid='wizard-description'>
          {stepIndex < numSteps ? stepsInfo[stepIndex].description : null}
        </Typography>
      </div>

      <div className={classes.component}>
        {stepsInfo.map((stepInfo, index) => (
          <div
            key={stepInfo.id}
            className={classNames({
              [classes.hide]: stepIndex !== index || finished
            })}
          >
            {steps[index]}
          </div>
        ))}
        <Typography
          variant='body1'
          color='error'
          gutterBottom
          className={classNames({
            [classes.hide]: requiredMessage === ''
          })}
        >
          {requiredMessage}
        </Typography>

        <Typography
          variant='title'
          gutterBottom
          className={classNames({
            [classes.hide]: !finished
          })}
          data-testid='wizard-finished-message'
        >
          {finishedMessage}
        </Typography>
      </div>
      <Stepper activeStep={stepIndex} alternativeLabel>
        {stepsInfo.map((stepInfo, index) => (
          <Step key={stepInfo.id}>
            <StepLabel>{index + 1 + ' - ' + stepInfo.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.controls} data-testid='wizard-control-bar'>
        {stepIndex === numSteps ? (
          <div>
            <Button onClick={reset} data-testid='wizard-control-bar-reset'>Reset</Button>
          </div>
        ) : (
          <div>
            <div>
              <Button
                disabled={stepIndex === 0 || finished}
                onClick={back}
                className={classes.rightSpacing}
                data-testid='wizard-control-bar-back'
              >
                Back
              </Button>

              <Button variant='contained' color='primary' onClick={next} data-testid='wizard-control-bar-next'>
                {stepIndex < numSteps - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Paper>
  </div>
)

MaterialWizard.propTypes = {
  classes: PropTypes.object,
  props: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
}

export default withStyles(styles)(MaterialWizard)
