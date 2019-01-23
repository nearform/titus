import React, { Component } from 'react'
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core'
import { Auth0Login } from './auth0'
import { OIDCLogin } from './oidc'
import { PageHeading } from './utils'

const MORE_INFO = 'More info dialog content'
const SUB_HEADER = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.'

class Identity extends Component {
  state = {
    tabsValue: 0
  }

  handleChange = (_, value) => this.setState({ tabsValue: value })

  render() {
    const { tabsValue } = this.state
    return (
      <Grid container spacing={24}>
        <PageHeading header="Identity" subHeader={SUB_HEADER} moreInfo={MORE_INFO}/>
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

export default Identity
