import React from 'react'

import createReactClass from 'create-react-class'

function withContext (context, contextTypes, children) {
  const wrapperWithContext = createReactClass({
    childContextTypes: contextTypes,
    getChildContext () {
      return context
    },
    render () {
      return children
    }
  })
  return React.createElement(wrapperWithContext)
}

export default withContext
