import React, { Component, Fragment } from 'react';
import MainNav from './nav/MainNav';
import BasicContent from './content/BasicContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import { metaData } from './mock/appData';
import { wizardData } from './mock/wizardData';
import Wizard from './components/Wizard';

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
              <Wizard data={wizardData} />
            ) : null}
          </MainNav>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
