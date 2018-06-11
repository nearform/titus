import React, { Component, Fragment } from 'react';
import MainNav from './nav/main-nav';
import BasicContent from './content/basic-content';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import { metaData } from './mock/app-data';
import { wizardData } from './mock/wizard-data';
import Wizard from './components/wizard/wizard';

const styles = {
  smallBottomMargin: {
    marginBottom: theme.spacing.unit * 3
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionId: ''
    };
  }

  handleSectionChange = sectionId => {
    this.setState({ sectionId: sectionId });
  };

  render() {
    const { sectionId } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <MainNav
            appName={metaData.name}
            sectionId={sectionId}
            onSectionChange={this.handleSectionChange}
          >
            {!sectionId ? (
              <BasicContent textContent={metaData.description} />
            ) : null}
            {sectionId === 'main-menu/steps' ? (
              <Wizard wizardData={wizardData} />
            ) : null}
          </MainNav>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
