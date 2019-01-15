import React from 'react'
import {AppBar, Tabs, Tab, Typography} from '@material-ui/core'
import Auth0Login from '../auth0/login'
import OIDCLogin from '../oidc/login'

class LoginTabs extends React.Component {
  state = {
    tabsValue: 0
  }

  handleChange = (event, value) => {
    this.setState({tabsValue: value})
  }

  render() {
    const {tabsValue} = this.state
    return (
      <div>
        <Typography variant="h3" gutterBottom>Identity</Typography>
        <Typography paragraph>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque.
        </Typography>
        <AppBar position="static">
          <Tabs value={tabsValue} onChange={this.handleChange}>
            <Tab label="Auth0"/>
            <Tab label="OIDC"/>
          </Tabs>
        </AppBar>
        {tabsValue === 0 && <Auth0Login></Auth0Login>}
        {tabsValue === 1 && <OIDCLogin>Tab two</OIDCLogin>}
      </div>
    )
  }
}

export default LoginTabs
