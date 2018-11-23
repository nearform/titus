import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import Auth0Login from '../auth0/login'
import OIDCLogin from '../oidc/login'

class LoginTabs extends React.Component {
    state =  {
        tabsValue: 0
    }

    handleChange = (event, value) => {
        this.setState({tabsValue: value})
    }
    
    render() {
        const { tabsValue } = this.state
        return (
            <div>
                <AppBar position="static">
                    <Tabs value={tabsValue} onChange={this.handleChange}>
                        <Tab label="Auth0"/>
                        <Tab label="OIDC"/>
                    </Tabs>
                </AppBar>
                { tabsValue === 0 && <Auth0Login></Auth0Login> }
                { tabsValue === 1 && <OIDCLogin>Tab two</OIDCLogin> }
            </div>
        )
    }
}

export default LoginTabs
