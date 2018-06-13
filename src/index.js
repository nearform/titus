import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Router } from '@reach/router'

import DocsApp from './docs/app'
import StarterApp from './starter/app'

const App = () => (
  <Router>
    <Redirect from='/' to='app' noThrow />
    <DocsApp path='docs/*' />
    <StarterApp path='app/*' />
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
