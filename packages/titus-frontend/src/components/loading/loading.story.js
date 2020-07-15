import React from 'react'
import Layout from 'src/components/layout'

import docs from './loading.mdx'

import Loader from './'

export default {
  title: 'Loader',
  decorators: [story => <Layout>{story()}</Layout>],
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const Default = () => <Loader />
