import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WizardStep from './wizard-step';
import WizardSummaryStep from './wizard-summary-step';
import Paper from '@material-ui/core/Paper';
import { theme } from '../../theme/theme';

const styles = {
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
};

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const { wizardData } = this.props;
    const newState = {
      stepIndex: 0,
      stepsSatisfied: [],
      stepsData: [],
      requiredMessage: '',
      finished: false
    };

    wizardData.steps.forEach((step, index) => {
      //don't add data for summary step
      if (index < wizardData.steps.length - 1) {
        const stepData = { info: step, data: {} };
        newState.stepsData.push(stepData);
      }
    });

    return newState;
  }

  handleNext = () => {
    this.setState(prevState => {
      const { stepsSatisfied, stepIndex } = prevState;
      const { wizardData } = this.props;

      let requiredMessage = '';
      let newStepIndex = prevState.stepIndex;
      if (!stepsSatisfied[stepIndex] && !wizardData.steps[stepIndex].optional) {
        requiredMessage = wizardData.steps[stepIndex].requiredMessage
          ? wizardData.steps[stepIndex].requiredMessage
          : wizardData.defaultRequiredMessage
            ? wizardData.defaultRequiredMessage
            : '';
      } else {
        newStepIndex++;
      }

      let finished = false;
      if (newStepIndex === wizardData.steps.length) {
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
    this.setState(this.getInitialState());
  };

  handleStepSatisfied = stepSatisfied => {
    this.setState(prevState => {
      const { stepIndex, stepsSatisfied } = prevState;
      stepsSatisfied[stepIndex] = stepSatisfied;
      return { stepsSatisfied: stepsSatisfied };
    });
  };

  handleStepDataChanged = data => {
    this.setState(prevState => {
      const { stepsData, stepIndex } = prevState;
      stepsData[stepIndex].data = data;
      return { stepsData: stepsData };
    });
  };

  render() {
    const { classes, wizardData } = this.props;
    const { stepIndex, stepsData, finished, requiredMessage } = this.state;

    const steps = wizardData.steps;
    return (
      <div className={classes.root}>
        <Paper className={classes.wizard}>
          <div className={classes.title}>
            <Typography variant="display1" gutterBottom="true">
              {wizardData.title}
            </Typography>
            <Typography variant="headline" gutterBottom="true">
              {stepIndex !== steps.length ? steps[stepIndex].description : null}
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
                  {index < steps.length - 1 ? (
                    <WizardStep
                      key={step.id}
                      info={step}
                      data={stepsData[index].data}
                      onStepSatisfied={stepSatisfied =>
                        this.handleStepSatisfied(stepSatisfied)
                      }
                      onDataChanged={stepData =>
                        this.handleStepDataChanged(stepData)
                      }
                    />
                  ) : (
                    <WizardSummaryStep
                      key={step.id}
                      summaryData={stepsData}
                      step={step}
                      onStepSatisfied={stepSatisfied =>
                        this.handleStepSatisfied(stepSatisfied)
                      }
                    />
                  )}

                  <Typography
                    variant="body1"
                    color="error"
                    gutterBottom="true"
                    className={requiredMessage === '' ? classes.hide : null}
                  >
                    {requiredMessage}
                  </Typography>
                </div>
              );
            })}
            <Typography
              variant="title"
              gutterBottom="true"
              className={!finished && classes.hide}
            >
              {wizardData.finishedMessage}
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
        </Paper>
      </div>
    );
  }
}

Wizard.propTypes = {
  classes: PropTypes.object.isRequred,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Wizard);
