import React from 'react'

import docs from './dashboard.mdx'

import Dashboard from './'

export default {
  title: 'Dashboard',
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const Default = () => <Dashboard />
