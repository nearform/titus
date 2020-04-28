import React from 'react'
import { Preview } from '@storybook/addon-docs/blocks'

export const StyledPreview = ({ children, ...props }) => (
  <Preview style={{ background: 'white' }} {...props}>
    {children}
  </Preview>
)
