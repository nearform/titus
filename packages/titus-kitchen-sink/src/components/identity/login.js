import React, {Component} from 'react'
import {AppBar, Tabs, Tab, Typography, Grid} from '@material-ui/core'
import Auth0Login from '../auth0/login'
import OIDCLogin from '../oidc/login'

class Login extends Component {
  state = {
    tabsValue: 0,
  }

  handleChange = (event, value) => {
    this.setState({tabsValue: value})
  }

  render() {
    const {tabsValue} = this.state
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h3" gutterBottom>Identity</Typography>
          <Typography paragraph>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <AppBar position="static">
            <Tabs value={tabsValue} onChange={this.handleChange}>
              <Tab label="Auth0"/>
              <Tab label="OIDC"/>
            </Tabs>
          </AppBar>
          {tabsValue === 0 && <Auth0Login/>}
          {tabsValue === 1 && <OIDCLogin>Tab two</OIDCLogin>}
        </Grid>
      </Grid>
    )
  }
}

export default Login
