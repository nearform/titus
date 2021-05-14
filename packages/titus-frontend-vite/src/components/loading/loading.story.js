import React from 'react'

import docs from './loading.mdx'

import Loader from './'

export default {
  title: 'Loader',
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const Default = () => <Loader />
