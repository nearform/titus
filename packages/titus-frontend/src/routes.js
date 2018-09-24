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
const AsyncTemporal = Loadable({
  loader: () => import('./components/temporal'),
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
    <AsyncDashboard path="/" />
    <AsyncWizard path="wizard/*" />
    <AsyncVisualisations path="visualisations/*" />
    <AsyncTables path="tables/*" />
    <AsyncAutocompleteDemo path="autocomplete/*" />
    <AsyncApi path="api/*" />
    <AsyncTemporal path="temporal/*" />
    <AsyncSearch path="search/*" />
    <AsyncComments path="comments/*" />
    <AsyncUploader path="uploader/*" />
    <AsyncAuthorization path="auth/*" />
    <AsyncTheming path="theming/*" />
    <AsyncTranslations path="translations/*" />
  </Router>
)

Routes.propTypes = {}

export default Routes
