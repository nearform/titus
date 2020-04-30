import React from 'react'
import docs from './dashboard.mdx'
import Layout from '../layout'
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
