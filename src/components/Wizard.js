import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WizardStep from './WizardStep';
import { theme } from '../theme/theme';

const styles = {
  root: {
    width: '100%'
  },
  title: {
    textAlign: 'center'
  },
  component: {
    width: '100%',
    padding: theme.spacing.unit * 3,
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
};

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      stepsSatisfied: [],
      requiredMessage: '',
      finished: false
    };
  }

  handleNext = () => {
    this.setState(prevState => {
      const { stepsSatisfied, stepIndex } = prevState;
      const { data } = this.props;

      let requiredMessage = '';
      let newStepIndex = prevState.stepIndex;
      if (!stepsSatisfied[stepIndex] && !data.steps[stepIndex].optional) {
        requiredMessage = data.steps[stepIndex].requiredMessage
          ? data.steps[stepIndex].requiredMessage
          : data.defaultRequiredMessage
            ? data.defaultRequiredMessage
            : '';
      } else {
        newStepIndex++;
      }

      let finished = false;
      if (newStepIndex === data.steps.length) {
        finished = true;
        if (this.props.onFinished) this.props.onFinished();
      }

      return {
        stepIndex: newStepIndex,
        requiredMessage: requiredMessage,
        finished: finished
      };
    });
  };

  handleBack = () => {
    this.setState(prevState => {
      return {
        stepIndex: prevState.stepIndex - 1,
        requiredMessage: ''
      };
    });
  };

  handleReset = () => {
    this.setState({
      stepIndex: 0,
      stepsSatisfied: [],
      requiredMessage: '',
      finished: false
    });
  };

  handleStepSatisfied = stepSatisfied => {
    this.setState(prevState => {
      prevState.stepsSatisfied[prevState.stepIndex] = stepSatisfied;
      return { stepsSatisfied: prevState.stepsSatisfied };
    });
  };

  render() {
    const { classes, data } = this.props;
    const { stepIndex, finished, requiredMessage } = this.state;

    const steps = data.steps;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="display1">{data.title}</Typography>
          <Typography variant="headline">
            {stepIndex !== steps.length
              ? 'Step ' + (stepIndex + 1) + ' - ' + steps[stepIndex].description
              : null}
          </Typography>
        </div>

        <div className={classes.component}>
          {steps.map((step, index) => {
            return (
              <div
                className={
                  stepIndex !== index || finished ? classes.hide : null
                }
              >
                <WizardStep
                  step={step}
                  onStepSatisfied={stepSatisfied =>
                    this.handleStepSatisfied(stepSatisfied)
                  }
                />
                <Typography
                  variant="body"
                  color="error"
                  className={requiredMessage === '' ? classes.hide : null}
                >
                  {requiredMessage}
                </Typography>
              </div>
            );
          })}
          <Typography variant="title" className={!finished && classes.hide}>
            {data.finishedMessage}
          </Typography>
        </div>
        <Stepper activeStep={stepIndex} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={step.id}>
                <StepLabel>{index + 1 + ' - ' + step.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className={classes.controls}>
          {stepIndex === steps.length ? (
            <div>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div>
                <Button
                  disabled={stepIndex === 0 || finished}
                  onClick={this.handleBack}
                  className={classes.rightSpacing}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {stepIndex < steps.length - 1 ? 'Next' : 'Finish'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Wizard.propTypes = {
  classes: PropTypes.object.isRequred,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Wizard);
