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
      finished: false
    };
  }

  handleNext = () => {
    this.setState(prevState => {
      return {
        stepIndex: prevState.stepIndex + 1
      };
    });
  };

  handleBack = () => {
    this.setState(prevState => {
      return {
        stepIndex: prevState.stepIndex - 1
      };
    });
  };

  handleFinish = () => {
    this.setState({ finished: true });
    if (this.props.onFinished) this.props.onFinished();
  };

  handleReset = () => {
    this.setState(prevState => {
      return { stepIndex: 0 };
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
    const { stepIndex, stepsSatisfied, finished } = this.state;

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
                <StepLabel>{index + 1 + ' - ' + step.name}</StepLabel>
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
                  disabled={stepIndex === 0}
                  onClick={this.handleBack}
                  className={classes.rightSpacing}
                >
                  Back
                </Button>
                {stepIndex < steps.length - 1 ? (
                  <Button
                    disabled={
                      !stepsSatisfied[stepIndex] && !steps[stepIndex].optional
                    }
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    disabled={
                      !stepsSatisfied[stepIndex] && !steps[stepIndex].optional
                    }
                    variant="contained"
                    color="primary"
                    onClick={this.handleFinish}
                  >
                    Finish
                  </Button>
                )}
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
