import React from 'react'
import Layout from '../layout'
import docs from './logo.mdx'
import Logo from './'

export default {
  title: 'Logo',
  decorators: [story => <Layout>{story()}</Layout>],
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const Default = () => <Logo />
