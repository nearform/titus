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
const AsyncTranslations = Loadable({
  loader: () => import('./components/translations'),
  loading: Loading,
  delay: 300,
  timeout: 10000
})

const Routes = () => (
  <Router>
    <AsyncDashboard path="/" />
    <AsyncTables path="tables/*" />
    <AsyncAutocompleteDemo path="autocomplete/*" />
    <AsyncApi path="api/*" />
    <AsyncTemporal path="temporal/*" />
    <AsyncSearch path="search/*" />
    <AsyncTranslations path="translations/*" />
  </Router>
)

Routes.propTypes = {}

export default Routes
