import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    width: '100%'
  }
};
class WizardStep extends React.Component {
  stepSatisfyCheck(name) {
    const stepSatisfied = name && name.trim() !== '';
    this.props.onStepSatisfied(stepSatisfied);
  }

  handleChange = e => {
    //user would create component with own logic for satisfying this step
    this.stepSatisfyCheck(e.target.value);
    const newData = { comment: e.target.value };
    this.props.onDataChanged(newData);
  };

  render() {
    const { classes, info, data } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          id="comment"
          label="Comment"
          required={info.optional ? false : true}
          value={data.comment ? data.comment : ''}
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
