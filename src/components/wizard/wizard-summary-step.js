import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  root: {
    width: '100%'
  },
  summary: {}
};
class WizardSummaryStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepSatisfied: ''
    };
  }

  handleChange = e => {
    //user would create component with own logic for satisfying this step
    this.setState({ stepSatisfied: e.target.checked });
    this.props.onStepSatisfied(e.target.checked);
  };

  render() {
    const { classes, summaryData } = this.props;

    return (
      <div className={classes.root}>
        {summaryData.map((stepSummary, index) => {
          return (
            <div className={classes.summary}>
              <ExpansionPanel key={stepSummary.info.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subheading" gutterBottom="true">
                    Step {index + 1} - {stepSummary.info.title}
                  </Typography>
                  <Typography
                    variant="subheading"
                    color="textSecondary"
                    gutterBottom="true"
                  >
                    : {stepSummary.info.description}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography variant="body1" gutterBottom="true">
                    Comment: {stepSummary.data.comment}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          );
        })}
        <Divider />
        <Switch
          checked={this.state.stepSatisfied}
          onChange={this.handleChange}
          value="stepSatisfied"
        />
      </div>
    );
  }
}

WizardSummaryStep.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(WizardSummaryStep);
