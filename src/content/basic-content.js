import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { theme } from '../theme/theme';

const styles = {
  root: {
    backgroundColor: theme.palette.background.default
  }
};

class BasicContent extends React.Component {
  render() {
    const { classes, textContent } = this.props;

    return (
      <div className={classes.root}>
        <Typography>{textContent}</Typography>
      </div>
    );
  }
}

BasicContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BasicContent);
