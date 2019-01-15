import React from 'react'
import Loadable from 'react-loadable'
import {Router} from '@reach/router'
import Loading from './loading'

const AsyncDashboard = Loadable({
  loader: () => import('./components/dashboard'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncWizard = Loadable({
  loader: () => import('./components/wizard'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncVisualisations = Loadable({
  loader: () => import('./components/visualisations'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncTables = Loadable({
  loader: () => import('./components/tables'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncAutocompleteDemo = Loadable({
  loader: () => import('./components/autocomplete'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncApi = Loadable({
  loader: () => import('./components/api'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncTemporal = Loadable({
  loader: () => import('./components/temporal'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncSearch = Loadable({
  loader: () => import('./components/search'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncComments = Loadable({
  loader: () => import('./components/comments'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncUploader = Loadable({
  loader: () => import('./components/uploader'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncAuthorization = Loadable({
  loader: () => import('./components/authorization'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncLoginTabs = Loadable({
  loader: () => import('./components/identity'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncAuth0Callback = Loadable({
  loader: () => import('./components/auth0/callback'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncOIDCCallback = Loadable({
  loader: () => import('./components/oidc/callback'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncTheming = Loadable({
  loader: () => import('./components/theming'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncTranslations = Loadable({
  loader: () => import('./components/translations'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const Routes = () => (
  <Router>
    <AsyncDashboard path="/"/>
    <AsyncWizard path="wizard/*"/>
    <AsyncVisualisations path="visualisations/*"/>
    <AsyncTables path="tables/*"/>
    <AsyncAutocompleteDemo path="autocomplete/*"/>
    <AsyncApi path="api/*"/>
    <AsyncTemporal path="temporal/*"/>
    <AsyncSearch path="search/*"/>
    <AsyncComments path="comments/*"/>
    <AsyncUploader path="uploader/*"/>
    <AsyncAuthorization path="auth/*"/>
    <AsyncLoginTabs path="identity/login"/>
    <AsyncAuth0Callback path="auth0/callback"/>
    <AsyncOIDCCallback path="oidc/callback"/>
    <AsyncTheming path="theming/*"/>
    <AsyncTranslations path="translations/*"/>
  </Router>
)

Routes.propTypes = {}

export default Routes
