import React from 'react'

import docs from './logo.mdx'

import Logo from './'

export default {
  title: 'Logo',
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const Default = () => <Logo />
