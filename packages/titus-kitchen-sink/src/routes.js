import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './containers/dashboard/dashboard'
import Wizard from './containers/wizard/wizard'
import Visualisations from './containers/visualisations/visualisations'
import Tables from './containers/tables/tables'
import AutocompleteDemo from './containers/autocomplete/autocomplete-demo'
import Api from './containers/api/api'
import Comments from './containers/comments/comments'
import Uploader from './containers/uploader/uploader'

const Routes = () => (
  <Router>
    <Dashboard path='/' />
    <Wizard path='wizard/*' />
    <Visualisations path='visualisations/*' />
    <Tables path='tables/*' />
    <AutocompleteDemo path='autocomplete/*' />
    <Api path='api/*' />
    <Comments path='comments/*' />
    <Uploader path='uploader/*' />
  </Router>
)

Routes.propTypes = {}

export default Routes
