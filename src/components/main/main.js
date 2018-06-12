import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  toolbarPlaceholder: {
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
});

const Main = ({ classes, children }) => (
  <main className={classes.root}>
    <div className={classes.toolbarPlaceholder} />
    {children}
  </main>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default withStyles(styles, { withTheme: true })(Main);
