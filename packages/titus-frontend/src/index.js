import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { register as registerServiceWorker } from './serviceWorker'

render(<App />, document.getElementById('root'))

registerServiceWorker()
