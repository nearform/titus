import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    width: '100%'
  }
};
class WizardStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  stepSatisfyCheck(name) {
    const stepSatisfied = name && name.trim() !== '';
    this.props.onStepSatisfied(stepSatisfied);
  }

  handleChange = e => {
    //user would create component with own logic for satisfying this step
    this.stepSatisfyCheck(e.target.value);
    this.setState({ name: e.target.value });
  };

  render() {
    const { classes, step } = this.props;
    const { name } = this.state;
    //this.stepSatisfyCheck(clone(name))
    return (
      <div className={classes.root}>
        <Typography variant="title">Component ID: {step.id}</Typography>
        <TextField
          id="name"
          label="Comment"
          required={step.optional ? false : true}
          value={name}
          onChange={this.handleChange}
          margin="normal"
        />
      </div>
    );
  }
}

WizardStep.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(WizardStep);
