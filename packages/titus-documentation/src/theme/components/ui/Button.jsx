import React from 'react'
import styled from 'react-emotion'

const BaseButton = styled('button')`
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
`

export const Button = ({ as: Component = BaseButton, ...props }) => (
  <Component {...props} />
)

export const ButtonLink = styled(Button)`
  background: transparent;
`
