import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './components/dashboard/dashboard'
import Wizard from './components/wizard/wizard'
import Visualisations from './components/visualisations/visualisations'
import Tables from './components/tables/tables'
import AutocompleteDemo from './components/autocomplete/autocomplete-demo'
import Api from './components/api/table'

import Search from './components/search/search'
import Comments from './components/comments/comments'
import Uploader from './components/uploader/uploader'
import Authorization from './components/authorization/authorization'

const Routes = () => (
  <Router>
    <Dashboard path='/' />
    <Wizard path='wizard/*' />
    <Visualisations path='visualisations/*' />
    <Tables path='tables/*' />
    <AutocompleteDemo path='autocomplete/*' />
    <Api path='api/*' />
    <Search path='search/*' />
    <Comments path='comments/*' />
    <Uploader path='uploader/*' />
    <Authorization path='authorization/*' />
  </Router>
)

Routes.propTypes = {}

export default Routes
