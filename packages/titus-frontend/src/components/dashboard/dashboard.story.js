import React from 'react'

import Layout from '../layout'

import docs from './dashboard.mdx'

import Dashboard from './'

export default {
  title: 'Dashboard',
  decorators: [story => <Layout>{story()}</Layout>],
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const Default = () => <Dashboard />
