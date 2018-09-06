import React from 'react'
import Loadable from 'react-loadable'
import { Router } from '@reach/router'
import Loading from './loading'

const AsyncDashboard = Loadable({
  loader: () => import('./components/dashboard/dashboard'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncWizard = Loadable({
  loader: () => import('./components/wizard/wizard'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const AsyncVisualisations = Loadable({
  loader: () => import('./components/visualisations/visualisations'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncTables = Loadable({
  loader: () => import('./components/tables/tables'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncAutocompleteDemo = Loadable({
  loader: () => import('./components/autocomplete/autocomplete-demo'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncApi = Loadable({
  loader: () => import('./components/api/table'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncSearch = Loadable({
  loader: () => import('./components/search/search'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncComments = Loadable({
  loader: () => import('./components/comments/comments'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncUploader = Loadable({
  loader: () => import('./components/uploader/uploader'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncAuthorization = Loadable({
  loader: () => import('./components/authorization/authorization'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})
const AsyncAuth0Login = Loadable({
  loader: () => import('./components/auth0/login'),
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

const Routes = () => (
  <Router>
    <AsyncDashboard path="/" />
    <AsyncWizard path="wizard/*" />
    <AsyncVisualisations path="visualisations/*" />
    <AsyncTables path="tables/*" />
    <AsyncAutocompleteDemo path="autocomplete/*" />
    <AsyncApi path="api/*" />
    <AsyncSearch path="search/*" />
    <AsyncComments path="comments/*" />
    <AsyncUploader path="uploader/*" />
    <AsyncAuthorization path="authorization/*" />
    <AsyncAuth0Login path="auth0/login" />
    <AsyncAuth0Callback path="auth0/callback" />
  </Router>
)

Routes.propTypes = {}

export default Routes
