import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { theme } from '../theme/theme';

const styles = {
  root: {},
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  toolbarPlaceholder: {
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
};

class BasicContent extends React.Component {
  render() {
    const { classes, textContent } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbarPlaceholder} />
          <Typography>{textContent}</Typography>
        </main>
      </div>
    );
  }
}

BasicContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BasicContent);
